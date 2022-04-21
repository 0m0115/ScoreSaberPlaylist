<script setup>
import { defineProps, ref } from 'vue'
import DataListItem from './DataListItem.vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import SortSelector from './SortSelector.vue'
import service from '../utils/service'

const props = defineProps({
  data: Object,
  playerInfo: Object,
  loading: Boolean
})

const visible = ref(false)
const playlistTitle = ref('ScoreSaberPlaylist')
const num = ref(0)

const pagination = {
  pageSize: 8,
  showTotal: (total, range) => `共 ${total} 条数据 [ ${range[0]} - ${range[1]} ]`,
  showQuickJumper: true
}

async function download () {
  await service.downloadPlaylist(props.data, props.playerInfo.avatar, playlistTitle.value, num.value)
  hideModal()
}

function showModal () {
  playlistTitle.value = `ScoreSaberPlaylist-${props.playerInfo.name}`
  num.value = props.data.length
  visible.value = true
}

function hideModal () {
  visible.value = false
}

function sort (sort) {
  service.sort(props.data, sort)
}
</script>

<template>
  <a-list :data-source="data" :pagination="pagination" class="data-list">
    <template #header>
      <a-spin :spinning="loading" size="large">
        <a-card hoverable v-if="loading || data?.length">
          <a-space size="large">
            <SortSelector :loading="loading" @change="sort" />

            <a-button type="primary" shape="round" size="large" :loading="loading" @click="showModal">
              <template #icon>
                <DownloadOutlined />
              </template>
              下载歌单
            </a-button>
          </a-space>
        </a-card>
      </a-spin>
    </template>

    <template #renderItem="{ item }">
      <DataListItem :item="item" :key="item.id" />
    </template>
  </a-list>

  <a-modal v-model:visible="visible" title="请输入歌单标题">

    <div class="model">

      <div>
        <a-input v-model:value="playlistTitle" placeholder="请输入歌单标题">
          <template #addonBefore>
            歌单标题
          </template>
        </a-input>
      </div>

      <div>
        下载前
        <a-input-number v-model:value="num" :min="1" :max="props.data.length" :precision="0" />
        首
      </div>
    </div>

    <template #footer>
      <a-button key="back" @click="hideModal">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="download">确定</a-button>
    </template>
  </a-modal>
</template>

<style scoped>
.data-list {
  padding: 0 20px 12px 20px;
}

.model {
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 10px;
}
</style>
