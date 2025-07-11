<template>
  <div class="challenge-card">
    <h3>✨ 나의 챌린지 현황 ✨</h3>

    <!-- 로그인 및 챌린지 진행 상태 -->
    <div v-if="isLoggedIn && currentProgress" class="challenge-body">
      <!-- 이전 버튼 -->
      <button
        @click="prev"
        class="arrow-btn side-btn left"
        aria-label="이전 챌린지"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b5e20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <!-- 챌린지 상세 정보 -->
      <div class="challenge-details">
        <p class="challenge-name">{{ currentProgress.challengeResponse.name }}</p>
        <p class="status-text">
          {{ currentProgress.completed
             ? '완료! 축하합니다 🎉'
             : `${currentProgress.currentStreak}일 연속` }}
        </p>
        <p v-if="!currentProgress.completed && currentProgress.currentStreak > 0">
          대단해요! 꾸준함은 성공의 열쇠! 🔑
        </p>
        <p v-else-if="!currentProgress.completed">
          지금 바로 챌린지를 시작해 보세요! 🚀
        </p>
        <!-- 인디케이터 -->
        <div v-if="progressList.length > 1" class="nav-indicator">
          {{ currentIndex + 1 }} / {{ progressList.length }}
        </div>
      </div>

      <!-- 다음 버튼 -->
      <button
        @click="next"
        class="arrow-btn side-btn right"
        aria-label="다음 챌린지"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1b5e20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow-right">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>

    <!-- 로그인 전 화면 -->
    <div v-else class="not-logged-in">
      <p>챌린지 상태를 보려면 로그인하세요! 🔒</p>
      <button @click="onLogin">로그인/회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'

const userStore = useUserStore()
const router    = useRouter()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const progressList = ref([])
const currentIndex = ref(0)
const currentProgress = computed(() => progressList.value[currentIndex.value] || null)

async function loadStatus() {
  if (!userStore.user?.userId) {
    progressList.value = []
    return
  }
  try {
    const res = await axios.get('/api/v1/user/challenge')
    progressList.value = Array.isArray(res.data) ? res.data : []
    currentIndex.value = 0
  } catch (err) {
    console.error('챌린지 상태 조회 실패', err)
    progressList.value = []
  }
}

function prev() {
  if (progressList.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + progressList.value.length) % progressList.value.length
}
function next() {
  if (progressList.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % progressList.value.length
}

watch(isLoggedIn, logged => {
  if (logged) loadStatus()
  else progressList.value = []
}, { immediate: true })

function onLogin() {
  router.push('/login')
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
.challenge-card:hover { transform: translateY(-5px); }

.challenge-card h3 {
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: 1.6em;
  font-weight: bold;
}

.challenge-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.side-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.side-btn:hover {
  background-color: rgba(0,0,0,0.05);
}

.icon-arrow-left,
.icon-arrow-right {
  width: 24px;
  height: 24px;
}

.challenge-details {
  flex: 1;
  text-align: center;
}

.challenge-name {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 8px;
  color: #388e3c;
}

.status-text {
  font-size: 1.8em;
  font-weight: bold;
  color: #1b5e20;
  margin-bottom: 12px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
}

.nav-indicator {
  margin-top: 12px;
  font-size: 0.9em;
  color: #555;
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