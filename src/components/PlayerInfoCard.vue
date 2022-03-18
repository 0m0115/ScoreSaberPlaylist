<script setup>
import { defineProps } from 'vue'
import { GlobalOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  playerInfo: Object
})

function openScoreSaber () {
  window.open(`https://scoresaber.com/u/${props.playerInfo.id}`, '_blank')
}

function openScoreSaberRankings () {
  const page = Math.ceil(props.playerInfo.rank / 50)
  window.open(`https://scoresaber.com/rankings?page=${page}`, '_blank')
}
</script>

<template>
  <a-card>
    <a-card-meta>
      <template #avatar>
        <a-avatar
          :size="64"
          :src="playerInfo.avatar"
          @click="openScoreSaber"
          class="cursor-pointer"
        />
      </template>

      <template #title>
        <a-button
          type="primary"
          size="large"
          shape="round"
          block
          ghost
          class="player-info-text"
          @click="openScoreSaber"
        >{{ playerInfo.name }}</a-button>
      </template>

      <template #description>
        <div class="player-info">
          <a-tooltip placement="bottom">
            <template #title>
              <span>Global Ranking</span>
            </template>

            <a-button type="link" class="player-info-text" @click="openScoreSaberRankings">
              <global-outlined />
              #{{ playerInfo.rank }}
            </a-button>
          </a-tooltip>

          <a-tooltip placement="bottom">
            <template #title>
              <span>Performance Points</span>
            </template>
            <a-button type="text" class="player-info-text">{{ playerInfo.pp }}pp</a-button>
          </a-tooltip>

          <a-tooltip placement="bottom" v-if="playerInfo.scoreStats?.averageRankedAccuracy">
            <template #title>
              <span>Average Ranked Accuracy</span>
            </template>
            <a-button
              type="text"
              class="player-info-text"
            >{{ playerInfo.scoreStats.averageRankedAccuracy.toFixed(2) }}%</a-button>
          </a-tooltip>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<style scoped>
.player-info {
  display: grid;
  grid-template-columns: auto auto;
}

.player-info-text {
  font-weight: bolder;
  font-size: 18px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
