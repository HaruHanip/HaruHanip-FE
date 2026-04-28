<template>
  <div class="challenge-card">
    <h3>✨ 나의 챌린지 현황 ✨</h3>
    <div v-if="isLoggedIn">
      <p class="status-text">{{ challengeStatus }}</p>
      <p v-if="challengeStatus.includes('연속')">대단해요! 꾸준함은 성공의 열쇠! 🔑</p>
      <p v-else>지금 바로 챌린지를 시작해 보세요! 🚀</p>
    </div>
    <div v-else class="not-logged-in">
      <p>챌린지 상태를 보려면 로그인하세요! 🔒</p>
      <button @click="emit('login-clicked')">로그인/회원가입</button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isLoggedIn: boolean
  challengeStatus: string
}>(), {
  isLoggedIn: false,
  challengeStatus: '',
})

const emit = defineEmits<{
  'login-clicked': []
}>()
</script>

<style scoped>
.challenge-card {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border: 1px solid #a5d6a7;
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
}

.challenge-card:hover { transform: translateY(-4px); }

.challenge-card h3 {
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  font-weight: bold;
}

.status-text {
  font-size: clamp(1.3rem, 5vw, 1.8rem);
  font-weight: bold;
  color: #1b5e20;
  margin-bottom: 8px;
}

.not-logged-in { text-align: center; }

.not-logged-in p {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: #555;
  margin-bottom: 12px;
}

.not-logged-in button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  font-weight: bold;
  min-height: 48px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.not-logged-in button:hover {
  background-color: var(--color-primary-dark);
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .challenge-card {
    padding: 18px 16px;
  }

  .not-logged-in button {
    width: 100%;
  }
}
</style>
