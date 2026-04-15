import { createApp } from 'vue'
import App from './App.vue'
import FormBlocksInit from './index'

import 'vue-select/dist/vue-select.css';
import './style.css'
import '@form-blocks/styles/scss/main.scss'

const app = createApp(App)

FormBlocksInit.install(app)

app.mount('#app')
