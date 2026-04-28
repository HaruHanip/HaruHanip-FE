import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/useUserStore'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.mount('#app')

const userStore = useUserStore()

if (userStore.accessToken) {
  if (!userStore.user) {
    userStore.fetchUser().catch(() => {
      userStore.logout()
    })
  }
}
