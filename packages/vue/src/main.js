import { createApp } from 'vue'
import App from './App.vue'
import { BApp } from 'bootstrap-vue-next'
import FormBlocksInit from './index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'vue-select/dist/vue-select.css';
import './style.css'
import '@form-blocks/styles/scss/main.scss'

const app = createApp(App)

FormBlocksInit.install(app)

app.mount('#app')
