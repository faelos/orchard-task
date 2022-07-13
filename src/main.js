import { createApp } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import App from './App.vue'

const app = createApp(App)
app.use(VueEasyLightbox)
app.mount('#app')
