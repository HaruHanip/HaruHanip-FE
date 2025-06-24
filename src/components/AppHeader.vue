<template>
  <header class="app-header">
    <div class="logo">
      <img src="../assets/logo.png" alt="로고" />
    </div>
    <nav class="nav-links">
      <button v-if="!props.isLoggedIn" @click="onLogin" class="btn-login">
        로그인/회원가입
      </button>
      <button v-else @click="onLogout" class="btn-mypage">
        마이페이지
      </button>
    </nav>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

// Reactive props for login state
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false }
})
const emit = defineEmits(['logout-clicked'])
const router = useRouter()

function onLogin() {
  // 로그인 페이지로 이동
  router.push('/login')
}

function onLogout() {
  emit('logout-clicked')
}
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

.nav-links button:hover {
  transform: translateY(-2px);
}

.nav-links .btn-login:hover {
  background-color: #388e3c;
}

.nav-links .btn-mypage:hover {
  background-color: #455a64;
}
</style>