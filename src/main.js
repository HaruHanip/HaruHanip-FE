import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia }  from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { useUserStore } from '@/stores/userStore'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.mount('#app')

// Pinia 초기화 후
const userStore = useUserStore()

if (userStore.token) {
  // 1) 토큰 복원
  userStore.setToken(userStore.token)

  // 2) user 정보가 없거나 오래됐으면(fetchUser)
  if (!userStore.user) {
    userStore.fetchUser().catch(() => {
      // 토큰 만료 등으로 fetchUser 실패 시, 강제 로그아웃 처리
      userStore.logout()
    })
  }
}