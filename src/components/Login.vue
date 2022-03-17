<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../utils/http'
import storage from '../utils/storage'
import { message } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'

const playerId = ref('')
const loading = ref(false)
const router = useRouter()

const playersMap = storage.getMap(storage.keys.players)

function handleLogin () {
  loading.value = true

  const matchResult = /scoresaber.com\/u\/(\S+)/.exec(playerId.value)
  if (matchResult && matchResult[1]) playerId.value = matchResult[1]

  http.getPlayerInfo(playerId.value)
    .then(info => {
      loading.value = false
      login(playerId.value)
    })
    .catch(e => {
      console.error(e)
      loading.value = false
      message.error('查询用户信息失败')
    })
}

function login (id) {
  router.push(`/u/${id}`)
}

const avatarMaxStyle = {
  'font-weight': 'bolder',
  'font-size': '22px',
  'background-color': '#b9d7ea'
}
</script>

<template>
  <div class="login-layout">
    <a-card>
      <div class="login-content">
        <a-image :width="128" :preview="false" src="https://scoresaber.com/images/logo.svg" />

        <div>
          <h1>Score Saber Playlist</h1>
          <h3>Version 1.2.0</h3>
        </div>

        <a-avatar-group
          v-if="playersMap.size > 0"
          :size="64"
          :maxCount="5"
          :max-style="avatarMaxStyle"
        >
          <a-tooltip
            v-for="player in playersMap.values()"
            :key="player.id"
            placement="top"
            :title="player.name"
          >
            <a-avatar :src="player.avatar" @click="login(player.id)" class="cursor-pointer" />
          </a-tooltip>
        </a-avatar-group>

        <a-input-search
          v-model:value="playerId"
          placeholder="请输入Score Saber账号或Score Saber主页网址"
          enter-button="确定"
          size="large"
          allow-clear
          :loading="loading"
          @search="handleLogin"
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input-search>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.login-layout {
  height: 100%;
  padding-bottom: 5%;
  display: grid;
  place-items: center;
}

.login-content {
  width: 600px;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  grid-row-gap: 40px;
  padding: 40px;
  border-radius: 18px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
