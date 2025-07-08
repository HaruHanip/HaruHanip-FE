<template>
  <div class="callback-page">
    <p>로그인 정보를 처리 중입니다...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getCookie } from '@/utils/cookie'

const router    = useRouter()
const route     = useRoute()
const userStore = useUserStore()

onMounted(async () => {
  try {
    // 2) document.cookie 에서 토큰을 꺼내 Pinia 에 저장
    const token = getCookie('accessToken')
    if (!token) throw new Error('쿠키에서 accessToken 을 찾을 수 없습니다')
    userStore.setToken(token)

    // 3) 프로필 조회
    await userStore.fetchUser()

    // 4) 홈으로
    router.replace('/')
  } catch (err) {
    console.error('OAuthCallback 오류:', err)
    router.replace('/login')
  }
})
</script>

<style scoped>
.callback-page {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}
</style>
