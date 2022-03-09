import { createApp } from 'vue'
import App from './App.vue'

import router from './utils/router'

import Antd from 'ant-design-vue'

import './assets/style/global.less'

import VueClipboard from 'vue3-clipboard'

const app = createApp(App)

app.use(router)

app.use(VueClipboard, {})

app.use(Antd)

app.mount('#app')
