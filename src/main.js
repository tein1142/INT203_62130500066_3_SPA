import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseCard from './components/BaseNavbar.vue'
createApp(App).use(router).component('base-navbar',BaseCard).mount('#app')
