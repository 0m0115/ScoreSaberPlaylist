<script setup>
import { ref, reactive, defineEmits, defineProps } from 'vue'
import { SearchOutlined, UserOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import http from '../utils/http'
import { message } from 'ant-design-vue'
import service from '../utils/service'
import storage from '../utils/storage'

defineProps({
  loading: Boolean
})

const visible = ref(false)
const competitorIdInput = ref()
const playersMap = storage.getMap(storage.keys.players)
const competitorLoading = ref(false)

const competitorInfo = reactive({})

const form = reactive({
  fullComboType: 'All',
  rankedType: 'Ranked',
  date: {
    enable: false,
    value: []
  },
  acc: {
    enable: false,
    value: [0, 100]
  },
  rank: {
    enable: false,
    greater: false,
    value: [0, 300]
  },

  pp: {
    enable: false,
    value: [0, 600]
  },
  stars: {
    enable: false,
    value: [0, 14]
  },
  sort: {
    type: 'PP',
    order: 'DESC'
  },
  competitor: {
    enable: false,
    id: null,
    type: 'All',
    totalPage: 0,
    unplayed: false
  }

})

const emits = defineEmits(['submit'])

function onSubmit () {
  emits('submit', form)
}

async function submitCompetitorId () {
  if (!competitorIdInput.value) {
    return
  }

  const competitorId = service.matchPlayerId(competitorIdInput.value)
  await getCompetitorInfo(competitorId)
}

async function getCompetitorInfo (competitorId) {
  competitorLoading.value = true

  try {
    const info = await http.getPlayerInfo(competitorId)
    competitorInfo.id = info.id
    competitorInfo.name = info.name
    competitorInfo.avatar = info.profilePicture
    form.competitor.totalPlayCount = info.scoreStats.totalPlayCount

    form.competitor.id = info.id

    form.competitor.enable = true

    playersMap.set(info.id, {
      id: info.id,
      name: info.name,
      avatar: info.profilePicture
    })
    storage.setMap(storage.keys.players, playersMap)

    hideModal()
  } catch {
    message.error('玩家信息查询失败')
  }

  competitorLoading.value = false
}

function showModal () {
  visible.value = true
}

function hideModal () {
  visible.value = false
  competitorIdInput.value = null
}

const accMarks = reactive({
  65: 'A-',
  80: 'S',
  90: 'SS'
})

const rankMarks = reactive({
  10: '10',
  50: '50',
  100: '100',
  200: '200',
  300: '300+'
})

const ppMarks = reactive({
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600+'
})

const pkTypeOptions = reactive([
  {
    value: 'All',
    label: '全部'
  },
  {
    value: 'Lower',
    label: '更低'
  },
  {
    value: 'Higher ',
    label: '更高'
  }
])

const headStyle = {
  'font-weight': 'bolder',
  'min-height': '30px'
}

const avatarMaxStyle = {
  'font-weight': 'bolder',
  'font-size': '22px',
  'background-color': '#b9d7ea'
}

function disabledDate (current) {
  return current && current > dayjs().endOf('day')
}

</script>

<template>
  <a-modal v-model:visible="visible" title="请选择比较对象" :width="600" :footer="null" @cancel="hideModal">
    <div class="competitor-modal-content">
      <a-avatar-group v-if="playersMap.size > 0" :size="64" :maxCount="5" :max-style="avatarMaxStyle">
        <a-tooltip v-for="player in playersMap.values()" :key="player.id" placement="top" :title="player.name">
          <a-avatar :src="player.avatar" @click="getCompetitorInfo(player.id)" class="cursor-pointer" />
        </a-tooltip>
      </a-avatar-group>

      <a-input-search v-model:value="competitorIdInput" placeholder="请输入Score Saber账号或Score Saber主页网址" enter-button="确定"
        size="large" allow-clear :loading="competitorLoading" @search="submitCompetitorId">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input-search>
    </div>
  </a-modal>

  <a-spin :spinning="loading" size="large">
    <a-card :bodyStyle="{ padding: '2px 24px' }">
      <a-card hoverable class="form-card-item">
        <a-space>
          <a-radio-group v-model:value="form.rankedType" button-style="solid" size="small">
            <a-radio-button value="All">全部</a-radio-button>
            <a-radio-button value="Ranked">排位曲</a-radio-button>
            <a-radio-button value="UnRanked">非排位曲</a-radio-button>
          </a-radio-group>

          <a-radio-group v-model:value="form.fullComboType" button-style="solid" size="small">
            <a-radio-button value="All">全部</a-radio-button>
            <a-radio-button value="FullCombo">已全连</a-radio-button>
            <a-radio-button value="UnFullCombo">未全连</a-radio-button>
          </a-radio-group>
        </a-space>
      </a-card>

      <a-card title="玩家比较" hoverable :headStyle="headStyle" class="form-card-item">
        <template #extra>
          <a-switch v-model:checked="form.competitor.enable" />
        </template>

        <a-space>
          与
          <a-tooltip v-if="form.competitor.enable && competitorInfo.id != undefined" placement="bottom"
            :title="competitorInfo.name">
            <a-avatar :size="64" :src="competitorInfo.avatar" class="cursor-pointer" @click="showModal" />
          </a-tooltip>
          <a-tooltip v-else placement="bottom" title="请选择比较对象">
            <a-avatar :size="64" class="cursor-pointer" @click="showModal">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-tooltip>相比
          <a-select ref="select" size="small" v-model:value="form.competitor.type" style="width: 120px"
            :options="pkTypeOptions" />

          <a-checkbox v-model:checked="form.competitor.unplayed">包含其未玩过谱面</a-checkbox>
        </a-space>
      </a-card>

      <a-card title="日期" hoverable :headStyle="headStyle" class="form-card-item">
        <template #extra>
          <a-switch v-model:checked="form.date.enable" />
        </template>
        <a-range-picker v-model:value="form.date.value" :disabled-date="disabledDate" :disabled="!form.date.enable"
          :locale="locale" />
      </a-card>

      <a-card title="ACC" hoverable :headStyle="headStyle" class="form-card-item">
        <template #extra>
          <a-switch v-model:checked="form.acc.enable" />
        </template>
        <a-slider v-model:value="form.acc.value" range :min="65" :disabled="!form.acc.enable"
          :tip-formatter="(value) => `${value}%`" :marks="accMarks" />
      </a-card>

      <a-card title="排名" hoverable :headStyle="headStyle" class="form-card-item">
        <template #extra>
          <a-switch v-model:checked="form.rank.enable" />
        </template>
        <a-slider v-model:value="form.rank.value" range :min="0" :max="300" :step="10" :disabled="!form.rank.enable"
          :tip-formatter="(value) => value === 300 ? '300+' : value" :marks="rankMarks" />
      </a-card>

      <div v-show="form.rankedType != 'UnRanked'">
        <a-card title="PP" hoverable :headStyle="headStyle" class="form-card-item">
          <template #extra>
            <a-switch v-model:checked="form.pp.enable" />
          </template>
          <a-slider v-model:value="form.pp.value" range :min="0" :max="600" :step="10" :disabled="!form.pp.enable"
            :tip-formatter="(value) => value === 600 ? '600+' : value" :marks="ppMarks" />
        </a-card>

        <a-card title="星级" hoverable :headStyle="headStyle" class="form-card-item">
          <template #extra>
            <a-switch v-model:checked="form.stars.enable" />
          </template>
          <a-slider v-model:value="form.stars.value" range :min="0" :max="14" :disabled="!form.stars.enable" />
        </a-card>
      </div>

      <a-button type="primary" shape="round" size="large" @click="onSubmit" :loading="loading">
        <template #icon>
          <search-outlined />
        </template>
        查询
      </a-button>
    </a-card>
  </a-spin>
</template>

<style scoped>
.form-card-item {
  margin: 12px 0;
  cursor: default;
}

.cursor-pointer {
  cursor: pointer;
}

.competitor-modal-content {
  text-align: center;
}
</style>
