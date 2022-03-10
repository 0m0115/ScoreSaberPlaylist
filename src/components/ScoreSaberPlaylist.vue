<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../utils/http'
import filter from '../utils/filter'
import PlayerInfoCard from './PlayerInfoCard.vue'
import FormCard from './FormCard.vue'
import DataList from './DataList.vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import service from '../utils/service'

const limit = 100

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
      playerInfo.profilePicture = info.profilePicture
      playerInfo.pp = info.pp
      playerInfo.rank = info.rank
      totalPage.value = Math.ceil(info.scoreStats.totalPlayCount / limit)
    })
    .catch(e => {
      message.error('查询用户信息失败')
      router.push('/')
    })
}

async function onSubmit (form) {
  await getData(form)
}

async function getData (form) {
  if (loading.value) {
    return
  }

  if (!playerInfo?.id) {
    message.error('请输入ScoreSaber账号')
    return
  }

  loading.value = true
  data.length = 0

  console.time('查询数据耗时')

  const promises = []
  for (let page = 1; page <= totalPage.value; page++) {
    const promise = getOnePageData(page, form)
    promises.push(promise)
  }
  await Promise.all(promises)

  console.timeEnd('查询数据耗时')
  loading.value = false
}

async function getOnePageData (page, form) {
  const playerScores = await http.getScores(playerInfo?.id, page, limit)

  const promises = []
  for (const playerScore of playerScores) {
    const promise = handlePlayerScore(playerScore, form)
    promises.push(promise)
  }
  await Promise.all(promises)

  const sort = {
    type: 'PP',
    order: 'DESC'
  }
  service.sort(data, sort)
}

async function handlePlayerScore (playerScore, form) {
  const score = playerScore.score
  const leaderboard = playerScore.leaderboard
  const item = {
    id: leaderboard.id,
    rank: score.rank,
    baseScore: score.baseScore,
    maxScore: leaderboard.maxScore,
    pp: score.pp,
    ppWeighted: score.pp * score.weight,
    fullCombo: score.fullCombo,
    timeSet: dayjs(score.timeSet),
    songHash: leaderboard.songHash,
    songName: leaderboard.songName,
    songSubName: leaderboard.songSubName,
    songAuthorName: leaderboard.songAuthorName,
    levelAuthorName: leaderboard.levelAuthorName,
    difficultyRaw: leaderboard.difficulty.difficultyRaw,
    ranked: leaderboard.ranked,
    stars: leaderboard.stars,
    coverImage: leaderboard.coverImage
  }
  if (await filter.dataFilter(item, form)) {
    data.push(item)
  }
}

async function downloadPlaylist (playlistTitle) {
  await service.downloadPlaylist(data, playlistTitle)
}

</script>

<template>
  <a-row justify="space-between" align="top" class="main-layout">
    <a-col :span="7" class="main-layout-sider">
      <PlayerInfoCard :player-info="playerInfo" />

      <FormCard @submit="onSubmit" :loading="loading" />
    </a-col>

    <a-col :span="17">
      <DataList :data="data" :loading="loading" @download="downloadPlaylist" />
    </a-col>
  </a-row>
</template>

<style scoped>
.main-layout {
  height: 100%;
}

.main-layout-sider {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 12px;
  padding: 12px;
}
</style>
