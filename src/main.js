import { createApp } from 'vue'
import App from './App.vue'

import router from './utils/router'

import Antd from 'ant-design-vue'

import './assets/style/global.less'

const app = createApp(App)

app.use(router)

app.use(Antd)

app.mount('#app')
