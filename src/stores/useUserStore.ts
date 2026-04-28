import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUserProfile } from '@/api/user'
import type { UserProfile } from '@/types/api'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<UserProfile | null>(null)

  const isLoggedIn = computed(() => !!user.value?.userId)
  const isGuest = computed(() => !isLoggedIn.value)

  function setAccessToken(token: string) {
    accessToken.value = token
  }

  async function fetchUser() {
    if (!accessToken.value) return
    const res = await getUserProfile()
    user.value = res.data
  }

  function logout() {
    accessToken.value = null
    user.value = null
  }

  return { accessToken, user, isLoggedIn, isGuest, setAccessToken, fetchUser, logout }
}, {
  persist: true,
})
