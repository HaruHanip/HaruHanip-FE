<template>
  <div class="main-screen">
    <AppHeader />

    <main class="content-area">
      <ChallengeSummaryCard
        :isLoggedIn="userStore.isLoggedIn"
        :challengeStatus="challengeStatus"
        @login-clicked="router.push('/login')"
      />

      <TodayProblemCTA />

      <div v-if="userStore.isGuest" class="non-member-message">
        <p>기록을 남기고 싶다면 로그인하세요! ✨</p>
        <button @click="router.push('/login')">로그인/회원가입</button>
      </div>
      <FriendRanking v-else :friends="friendsList" />

      <InterviewPrepBanner />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import AppHeader from '@/components/common/AppHeader.vue'
import TodayProblemCTA from '@/components/common/TodayProblemCTA.vue'
import InterviewPrepBanner from '@/components/common/InterviewPrepBanner.vue'
import ChallengeSummaryCard from '@/components/challenge/ChallengeSummaryCard.vue'
import FriendRanking from '@/components/challenge/FriendRanking.vue'

const router = useRouter()
const userStore = useUserStore()

const challengeStatus = '연속 3일 성공 중'
const friendsList: { name: string; streak: number }[] = []
</script>

<style scoped>
.main-screen {
  width: 60%;
  margin: 0 auto;
  padding: 16px var(--page-padding-x);
  min-height: 100dvh;
}

.content-area {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.non-member-message {
  background-color: #ffe0b2;
  border: 1px solid #ffcc80;
  padding: 20px;
  border-radius: var(--radius-lg);
  color: #e65100;
  font-size: 1rem;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.non-member-message p {
  margin-bottom: 12px;
  font-weight: bold;
}

.non-member-message button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  font-weight: bold;
  min-height: 44px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.non-member-message button:hover {
  background-color: #fb8c00;
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .main-screen {
    width: 100%;
    padding: 12px var(--page-padding-x-mobile);
  }

  .content-area {
    margin-top: 16px;
    gap: 14px;
  }
}
</style>
