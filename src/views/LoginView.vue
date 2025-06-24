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

<script setup>
// OAuth 로그인 엔드포인트 맵
const oauthUrls = {
  kakao: '/oauth2/authorization/kakao',
  naver: '/oauth2/authorization/naver'
}
function login(provider) {
  window.location.href = oauthUrls[provider]
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff 0%, #f8f0ff 100%);
  padding: 20px;
}

.login-card {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 360px;
  width: 100%;
  border: 1px solid #e0e7ff;
}

.login-logo {
  width: 80px;
  margin-bottom: 16px;
}

.login-card h2 {
  margin-bottom: 8px;
  font-size: 1.8em;
  color: #333;
}

.subtext {
  margin-bottom: 24px;
  color: #555;
  font-size: 1em;
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
  padding: 12px;
  font-size: 1em;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn .icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.oauth-kakao {
  background-color: #FEE500;
  color: #3C1E1E;
}
.oauth-kakao:hover {
  background-color: #E6D100;
  transform: translateY(-2px);
}

.oauth-naver {
  background-color: #03C75A;
  color: #ffffff;
}
.oauth-naver:hover {
  background-color: #02A94F;
  transform: translateY(-2px);
}

.info {
  font-size: 0.85em;
  color: #888;
  margin-top: 12px;
}
</style>
