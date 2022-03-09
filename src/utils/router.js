import ScoreSaberPlaylist from '../components/ScoreSaberPlaylist.vue'
import Login from '../components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/u/:id',
    component: ScoreSaberPlaylist
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
