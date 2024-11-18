import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
