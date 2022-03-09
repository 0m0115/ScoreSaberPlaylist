<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import DataListItem from './DataListItem.vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import SortSelector from './SortSelector.vue'
import service from '../utils/service'

const props = defineProps({
  data: Object,
  loading: Boolean
})

const visible = ref(false)
const playlistTitle = ref('ScoreSaberPlaylist')

const emits = defineEmits(['download'])

const pagination = {
  pageSize: 8,
  showTotal: (total, range) => `共 ${total} 条数据 [ ${range[0]} - ${range[1]} ]`,
  showQuickJumper: true
}

function download () {
  emits('download', playlistTitle.value)
  hideModal()
}

function showModal () {
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
            <SortSelector @change="sort" />

            <a-button
              type="primary"
              shape="round"
              size="large"
              :loading="loading"
              @click="showModal"
            >
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
    <a-input v-model:value="playlistTitle" placeholder="请输入歌单标题" />

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
</style>
