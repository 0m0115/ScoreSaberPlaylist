<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../utils/http'
import { message } from 'ant-design-vue'

const playerId = ref('')
const loading = ref(false)
const router = useRouter()

function login () {
  loading.value = true

  http.getPlayerInfo(playerId.value)
    .then(info => {
      loading.value = false
      router.push(`/u/${playerId.value}`)
    })
    .catch(e => {
      loading.value = false
      message.error('查询用户信息失败')
    })
}
</script>

<template>
  <div class="login-layout">
    <a-card>
      <div class="login-content">
        <a-image :width="128" :preview="false" src="https://scoresaber.com/images/logo.svg" />

        <div>
          <h1>Score Saber Playlist</h1>
          <h3>Version 1.1.4</h3>
        </div>

        <a-input-search
          v-model:value="playerId"
          placeholder="请输入Score Saber账号"
          enter-button="确定"
          size="large"
          allow-clear
          :loading="loading"
          @search="login"
        >
          <template #prefix>
            <user-outlined type="user" />
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
  width: 500px;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  grid-row-gap: 40px;
  padding: 40px;
  border-radius: 18px;
}
</style>
