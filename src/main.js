import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseInput from './components/BaseInput.vue'
const app = createApp(App)
app.component('base-navbar',BaseNavbar)
app.component('base-input',BaseInput)
app.use(router).mount('#app')