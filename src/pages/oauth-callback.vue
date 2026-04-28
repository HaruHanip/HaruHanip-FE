<template>
  <div class="callback-page">
    <p>로그인 정보를 처리 중입니다...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { getCookie } from '@/utils/cookie'

const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  try {
    const token = getCookie('accessToken')
    if (!token) throw new Error('쿠키에서 accessToken을 찾을 수 없습니다')

    userStore.setAccessToken(token)
    await userStore.fetchUser()
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
