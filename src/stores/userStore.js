// stores/userStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { getUserProfile } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user?.userId,
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    async fetchUser() {
      console.log(this.token);
      if (!this.token) return
      const res = await getUserProfile()
      this.user = res.data
      console.log(res);
    },
    logout() {
      this.token = null
      this.user = null
      delete axios.defaults.headers.common['Authorization']
    }
  },
  persist: true,
})
