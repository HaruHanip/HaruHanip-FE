<template>
  <div class="challenge-card">
    <h3>✨ 나의 챌린지 현황 ✨</h3>
    <div v-if="props.isLoggedIn">
      <p class="status-text">{{ props.challengeStatus }}</p>
      <p v-if="props.challengeStatus.includes('연속')">대단해요! 꾸준함은 성공의 열쇠! 🔑</p>
      <p v-else>지금 바로 챌린지를 시작해 보세요! 🚀</p>
    </div>
    <div v-else class="not-logged-in">
      <p>챌린지 상태를 보려면 로그인하세요! 🔒</p>
      <button @click="handleLogin">로그인/회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// props와 emit 선언
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  challengeStatus: { type: String, required: true }
})
const emit = defineEmits(['login-clicked'])

// 로그인 버튼 클릭 이벤트 핸들러
function handleLogin() {
  emit('login-clicked')
}
</script>

<style scoped>
.challenge-card {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border: 1px solid #a5d6a7;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.challenge-card:hover {
  transform: translateY(-5px);
}
.challenge-card h3 {
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: 1.6em;
  font-weight: bold;
}
.status-text {
  font-size: 1.8em;
  font-weight: bold;
  color: #1b5e20;
  margin-bottom: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}
.not-logged-in {
  text-align: center;
}
.not-logged-in p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 12px;
}
.not-logged-in button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.not-logged-in button:hover {
  background-color: #388e3c;
  transform: scale(1.02);
}
</style>
