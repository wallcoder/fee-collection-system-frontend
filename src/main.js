import './assets/style.css'
import { createPinia } from 'pinia';
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { MotionPlugin } from '@vueuse/motion';


axios.defaults.baseURL = 'http://localhost:3000';
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia)
app.use(MotionPlugin);
app.mount('#app')
