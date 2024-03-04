import './assets/main.css'
import CodeApron from './components'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(CodeApron)
app.mount('#app')
