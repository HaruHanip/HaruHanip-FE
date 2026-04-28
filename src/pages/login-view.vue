<template>
  <div class="login-page">
    <div class="login-card">
      <img src="@/assets/logo.png" alt="하루한CS 로고" class="login-logo" />
      <h2>환영합니다!</h2>
      <p class="subtext">하루 한 번으로 CS 실력을 쌓아보세요.</p>
      <div class="oauth-buttons">
        <button class="btn oauth-kakao" @click="login('kakao')">
          <img src="@/assets/kakao-icon.png" alt="카카오 아이콘" class="icon" />
          카카오로 로그인
        </button>
        <button class="btn oauth-naver" @click="login('naver')">
          <img src="@/assets/naver-icon.png" alt="네이버 아이콘" class="icon" />
          네이버로 로그인
        </button>
      </div>
      <p class="info">로그인 시 이용 약관 및 개인정보 처리방침에 동의합니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const API_BASE = import.meta.env.VITE_API_BASE_URL

const oauthUrls: Record<string, string> = {
  kakao: `${API_BASE}/oauth2/authorization/kakao`,
  naver: `${API_BASE}/oauth2/authorization/naver`,
}

function login(provider: string) {
  window.location.href = oauthUrls[provider]
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background: linear-gradient(135deg, #eef2ff 0%, #f8f0ff 100%);
  padding: 20px var(--page-padding-x-mobile);
}

.login-card {
  background-color: var(--color-white);
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  width: 100%;
  max-width: 380px;
  border: 1px solid #e0e7ff;
}

.login-logo {
  width: clamp(60px, 20vw, 80px);
  margin-bottom: 16px;
}

.login-card h2 {
  margin-bottom: 8px;
  font-size: clamp(1.4rem, 5vw, 1.8rem);
  color: var(--color-text);
}

.subtext {
  margin-bottom: 24px;
  color: var(--color-text-muted);
  font-size: clamp(0.9rem, 3vw, 1rem);
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  font-size: clamp(0.9rem, 3vw, 1rem);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-pill);
  min-height: 52px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn .icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  flex-shrink: 0;
}

.oauth-kakao { background-color: #FEE500; color: #3C1E1E; }
.oauth-kakao:hover { background-color: #E6D100; transform: translateY(-2px); }

.oauth-naver { background-color: #03C75A; color: #ffffff; }
.oauth-naver:hover { background-color: #02A94F; transform: translateY(-2px); }

.info {
  font-size: 0.8rem;
  color: #888;
  margin-top: 12px;
  line-height: 1.4;
}

@media (max-width: 400px) {
  .login-card {
    padding: 28px 20px;
  }
}
</style>
