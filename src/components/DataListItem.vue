<script setup>
import { defineProps, computed, ref } from 'vue'
import { CopyFilled, CloudDownloadOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import http from '../utils/http'
import { message } from 'ant-design-vue'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()

const props = defineProps({
  item: Object
})

const key = ref(props.item?.key)
const mapperId = ref(props.item?.mapperId)

const accDifference = computed(() => props.item.acc - props.item.competitorAcc)

const diffTextMap = new Map([
  ['_Easy_SoloStandard', 'E'],
  ['_Normal_SoloStandard', 'N'],
  ['_Hard_SoloStandard', 'H'],
  ['_Expert_SoloStandard', 'Ex'],
  ['_ExpertPlus_SoloStandard', 'Ex+']
])

const diffColorMap = new Map([
  ['_Easy_SoloStandard', 'green'],
  ['_Normal_SoloStandard', 'cyan'],
  ['_Hard_SoloStandard', 'orange'],
  ['_Expert_SoloStandard', 'red'],
  ['_ExpertPlus_SoloStandard', 'purple']
])

const diffText = computed(() => {
  return props.item.ranked ? `${props.item.stars}★` : diffTextMap.get(props.item.difficultyRaw) ?? 'O'
})

const diffColor = computed(() => {
  return diffColorMap.get(props.item.difficultyRaw) ?? 'yellow'
})

async function getSongInfo () {
  if (key.value && mapperId.value) {
    return
  }

  return http.getSongInfo(props.item.songHash)
    .then(songInfo => {
      key.value = songInfo?.id
      mapperId.value = songInfo?.uploader?.id
    })
    .catch(e => {
      message.error('BeatSaver谱面信息获取失败')
    })
}

async function openBeatSaver () {
  await getSongInfo()

  if (key.value) {
    window.open(`https://beatsaver.com/maps/${key.value}`, '_blank')
  }
}

async function openMapperProfile () {
  await getSongInfo()

  if (mapperId.value) {
    window.open(`https://beatsaver.com/profile/${mapperId.value}`, '_blank')
  }
}

async function copy () {
  await getSongInfo()

  if (key.value) {
    const bsrKey = `!bsr ${key.value}`
    try {
      await toClipboard(bsrKey)
      message.success('复制成功: ' + bsrKey)
    } catch {
      message.error('复制失败')
    }
  }
}

async function oneClick () {
  await getSongInfo()

  if (key.value) {
    window.open(`beatsaver://${key.value}`, '_blank')
  }
}

function downloadZip () {
  window.open(`https://na.cdn.beatsaver.com/${props.item.songHash.toLowerCase()}.zip`, '_blank')
}
</script>

<template>
  <div class="data-list-item">
    <a-badge-ribbon :text="diffText" :color="diffColor" placement="start">
      <a-card :bodyStyle="{ padding: '10px' }">
        <a-row justify="space-between" align="middle" wrap>
          <a-col :span="16">
            <a-row justify="start" wrap>
              <a-col>
                <a-image
                  :width="64"
                  :src="item.coverImage"
                  placeholder
                  fallback="data:image/png;base64,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"
                />
              </a-col>

              <a-col>
                <a-row justify="start">
                  <a-button type="link" @click="openBeatSaver">
                    <span
                      class="info-text text-bolder"
                    >{{ item.songName }} {{ item.songSubName }} - {{ item.songAuthorName }}</span>
                  </a-button>
                </a-row>

                <a-row justify="start">
                  <a-button
                    class="info-text"
                    type="text"
                    @click="openMapperProfile"
                  >{{ item.levelAuthorName }}</a-button>
                </a-row>
              </a-col>
            </a-row>
          </a-col>

          <a-col :span="8">
            <a-row justify="end">
              <a-space>
                <span class="text-bolder">{{ item.timeSet.format('YYYY.MM.DD') }}</span>

                <a-button v-if="item.acc != -Infinity" type="primary" ghost shape="round">
                  <span class="text-bolder">{{ item.acc.toFixed(2) }}%</span>
                  <span
                    v-if="item.competitorAcc != undefined"
                    :class="`acc-difference ${accDifference > 0 ? 'acc-higher' : 'acc-lower'}`"
                  >{{ `${accDifference > 0 ? '+' : ''}${accDifference.toFixed(2)}%` }}</span>
                </a-button>

                <a-button
                  v-if="item.ranked"
                  type="primary"
                  ghost
                  shape="round"
                  class="text-bolder"
                >{{ item.pp.toFixed(2) }}pp / {{ item.ppWeighted.toFixed(2) }}pp</a-button>

                <a-tooltip placement="bottom">
                  <template #title>
                    <span>Copy BSR</span>
                  </template>

                  <a-button type="primary" shape="circle" @click="copy">
                    <template #icon>
                      <copy-filled />
                    </template>
                  </a-button>
                </a-tooltip>

                <a-tooltip placement="bottom">
                  <template #title>
                    <span>One-Click</span>
                  </template>

                  <a-button type="primary" shape="circle" @click="oneClick">
                    <template #icon>
                      <cloud-download-outlined />
                    </template>
                  </a-button>
                </a-tooltip>

                <a-tooltip placement="bottom">
                  <template #title>
                    <span>Download zip</span>
                  </template>

                  <a-button type="primary" shape="circle" @click="downloadZip">
                    <template #icon>
                      <download-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </a-space>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </a-badge-ribbon>
  </div>
</template>

<style scoped>
.data-list-item {
  padding: 8px 0 0 0;
}

.info-text {
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
  text-align: left;
}

.text-bolder {
  font-weight: bolder;
  font-size: 16px;
}

.acc-difference {
  font-weight: bolder;
  margin-left: 12px;
  color: #52c41a;
}

.acc-lower {
  color: #ff4d4f;
}

.acc-higher {
  color: #52c41a;
}
</style>
