<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../utils/http'
import filter from '../utils/filter'
import PlayerInfoCard from './PlayerInfoCard.vue'
import FormCard from './FormCard.vue'
import DataList from './DataList.vue'
import { message } from 'ant-design-vue'
import service from '../utils/service'
import pLimit from 'p-limit'
import storage from '../utils/storage'
import config from '../utils/config'

const limit = pLimit(7)
const dataAll = []

let competitorId = null
const competitorMap = new Map()

const playerInfo = reactive({})
const data = reactive([])
const totalPage = ref(0)

const loading = ref(false)

const router = useRouter()
const playerId = router.currentRoute.value.params.id
if (playerId) {
  initPlayerInfo(playerId)
}

function initPlayerInfo (playerId) {
  http.getPlayerInfo(playerId)
    .then(info => {
      playerInfo.id = info.id
      playerInfo.name = info.name
      playerInfo.avatar = info.profilePicture
      playerInfo.pp = info.pp
      playerInfo.rank = info.rank
      totalPage.value = Math.ceil(info.scoreStats.totalPlayCount / config.pageSize)

      const playersMap = storage.getMap(storage.keys.players)
      playersMap.set(info.id, {
        id: info.id,
        name: info.name,
        avatar: info.profilePicture
      })
      storage.setMap(storage.keys.players, playersMap)
    })
    .catch(e => {
      console.error(e)
      message.error('玩家信息查询失败')
      router.push('/')
    })
}

async function onSubmit (form) {
  if (loading.value) {
    return
  }

  if (!playerInfo?.id) {
    message.error('用户信息查询失败')
    router.push('/')
    return
  }

  loading.value = true
  data.length = 0

  console.time('总耗时')

  console.time('查询玩家记录耗时')
  await getData()
  console.timeEnd('查询玩家记录耗时')

  console.time('查询比较对象记录耗时')
  await getCompetitorData(form)
  console.timeEnd('查询比较对象记录耗时')

  console.time('处理数据耗时')
  await handleData(form)
  console.timeEnd('处理数据耗时')

  console.timeEnd('总耗时')
  console.log('------------------------------')

  const sort = {
    type: 'pp',
    order: 'DESC'
  }
  service.sort(data, sort)

  loading.value = false
}

async function getCompetitorData (form) {
  const id = form.competitor.id

  if (!form.competitor.enable || !id || id === competitorId) {
    return
  }

  competitorMap.clear()

  if (id === playerId) {
    return
  }

  competitorId = id

  const totalPage = Math.ceil(form.competitor.totalPlayCount / config.pageSize)

  const callback = (playerScore) => {
    const id = playerScore.leaderboard.id
    const baseScore = playerScore.score.baseScore
    const pp = playerScore.score.pp

    competitorMap.set(id, { baseScore, pp })
  }

  await getDataAllPage(id, totalPage, callback)
}

async function getData () {
  if (dataAll?.length) {
    return
  }

  const callback = (playerScore) => {
    const item = service.playerScoreToItem(playerScore)
    dataAll.push(item)
  }

  await getDataAllPage(playerInfo?.id, totalPage.value, callback)
}

async function getDataAllPage (id, totalPage, callback) {
  const promises = []
  for (let page = 1; page <= totalPage; page++) {
    const promise = getOnePageData(id, page, callback)
    promises.push(promise)
  }
  await Promise.all(promises)
}

async function getOnePageData (id, page, callback) {
  try {
    const playerScores = await http.getScores(id, page)
    for (const playerScore of playerScores) {
      callback(playerScore)
    }
  } catch (e) {
    console.error(e)
    message.error('ScoreSaber记录查询异常')
  }
}

async function handleData (form) {
  const promises = []
  for (const item of dataAll) {
    const promise = limit(() => handleOneItem(item, form))
    promises.push(promise)
  }
  await Promise.all(promises)
}

async function handleOneItem (item, form) {
  if (await filter.dataFilter(item, form, competitorMap)) {
    data.push(item)
  }
}

</script>

<template>
  <a-spin :spinning="playerInfo?.id === undefined" size="large">
    <a-row justify="space-between" align="top" class="main-layout">
      <a-col :span="7" class="main-layout-slider">
        <PlayerInfoCard :player-info="playerInfo" />

        <FormCard @submit="onSubmit" :loading="loading" />
      </a-col>

      <a-col :span="17">
        <DataList :data="data" :playerInfo="playerInfo" :loading="loading" />
      </a-col>
    </a-row>
  </a-spin>
</template>

<style scoped>
.main-layout {
  height: 100%;
}

.main-layout-slider {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 12px;
  padding: 12px;
}
</style>
