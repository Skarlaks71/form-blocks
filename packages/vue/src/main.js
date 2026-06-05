import { createApp } from 'vue'
import App from './App.vue'
import FormBlocksInit from './index'
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { HiEye, HiEyeOff } from "oh-vue-icons/icons/hi"
import './styles'

const app = createApp(App)

FormBlocksInit.install(app)

addIcons(HiEye, HiEyeOff)
app.component("v-icon", OhVueIcon)

app.mount('#app')
