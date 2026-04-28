import { createApp } from 'vue'
import App from './App.vue'
import FormBlocksInit from './index'

import './styles'

const app = createApp(App)

FormBlocksInit.install(app)

app.mount('#app')
