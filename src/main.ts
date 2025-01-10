import './assets/main.css'
import 'leaflet/dist/leaflet.css';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { useAuthStore } from '@/stores/auth.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')

const authStore = useAuthStore();
