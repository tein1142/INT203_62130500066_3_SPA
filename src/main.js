import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseCard from './components/BaseNavbar.vue'
import BaseInput from './components/BaseInput.vue'
const app = createApp(App)
app.component('base-navbar',BaseCard)
app.component('base-input',BaseInput)
app.use(router).mount('#app')