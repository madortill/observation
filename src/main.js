import { createApp } from 'vue'
import App from './App.vue'
import index from './index'
import './assets/main.css'

// const app = createApp(App)
createApp(App).use(index).mount('#app')
app.mount('#app')
