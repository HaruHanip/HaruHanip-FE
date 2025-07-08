<template>
  <header class="app-header">
    <div class="logo">
      <a href="/">
        <img src="@/assets/logo.png" alt="로고" />
      </a>
    </div>
      <nav class="nav-links">
        <button v-if="!isLoggedIn" @click="onLogin" class="btn-login">
          로그인/회원가입
        </button>
        <button v-else @click="onLogout" class="btn-logout">
          로그아웃
        </button>
        <button v-if="isLoggedIn" @click="goToMyPage" class="btn-mypage">
          마이페이지
        </button>
      </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router    = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => !!userStore.user?.userId)
const userName   = computed(() => userStore.user?.userName || '')
const userJob    = computed(() => userStore.user?.jobClassCode || '')

function onLogin()  { router.push('/login') }
function onLogout() { userStore.logout() }
function goToMyPage(){ router.push('/mypage') }
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

.logo img {
  height: 60px;
  width: auto;
  vertical-align: middle;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-links button {
  background-color: #607d8b;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-links .btn-login {
  background-color: #4caf50;
}

.nav-links .btn-logout {
  background-color: #f44336;
}

.nav-links .btn-mypage {
  background-color: #42a5f5;
}

.nav-links button:hover {
  transform: translateY(-2px);
}

.nav-links .btn-login:hover {
  background-color: #388e3c;
}

.nav-links .btn-logout:hover {
  background-color: #d32f2f;
}

.nav-links .btn-mypage:hover {
  background-color: #1e88e5;
}
</style>
