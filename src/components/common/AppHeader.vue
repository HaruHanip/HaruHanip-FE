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
      <template v-else>
        <button @click="onLogout" class="btn-logout">로그아웃</button>
        <button @click="goToMyPage" class="btn-mypage">마이페이지</button>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)

function onLogin() { router.push('/login') }
function onLogout() { userStore.logout() }
function goToMyPage() { router.push('/mypage') }
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-lg);
}

.logo img {
  height: 52px;
  width: auto;
  vertical-align: middle;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links button {
  background-color: #607d8b;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 44px;
  white-space: nowrap;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-login { background-color: var(--color-primary); }
.btn-login:hover { background-color: var(--color-primary-dark); transform: translateY(-2px); }

.btn-logout { background-color: var(--color-danger); }
.btn-logout:hover { background-color: #d32f2f; transform: translateY(-2px); }

.btn-mypage { background-color: var(--color-blue); }
.btn-mypage:hover { background-color: var(--color-blue-dark); transform: translateY(-2px); }

@media (max-width: 640px) {
  .app-header {
    padding: 10px 14px;
    border-radius: var(--radius-md);
  }

  .logo img {
    height: 40px;
  }

  .nav-links button {
    padding: 8px 12px;
    font-size: 0.82rem;
  }
}

/* 버튼 2개일 때 글자가 너무 좁으면 마이페이지 텍스트 축약 */
@media (max-width: 400px) {
  .btn-mypage::after {
    content: '';
  }
  .btn-mypage {
    font-size: 0;
    padding: 8px 10px;
    min-width: 44px;
  }
  .btn-mypage::before {
    content: 'MY';
    font-size: 0.82rem;
  }
}
</style>
