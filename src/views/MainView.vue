<!-- src/views/MainScreen.vue -->
<template>
  <div class="main-screen">
    <!-- 헤더 컴포넌트: 로고와 로그인/마이페이지 버튼이 있어요! -->
    <Header :isLoggedIn="isLoggedIn" />

    <main class="content-area">
      <!-- 챌린지 요약 카드: 지금 챌린지를 얼마나 잘하고 있는지 보여줘요! -->
      <ChallengeSummaryCard
        :isLoggedIn="isLoggedIn"
        :challengeStatus="challengeStatus"
        @login-clicked="handleLogin"
      />

      <!-- 오늘의 문제 풀기 버튼: 매일매일 새로운 문제를 풀러 가볼까요? -->
      <TodaysProblemCTA @start-problem="goToProblemSolving" />

      <!-- 로그인 여부에 따라 비회원 메시지 ↔ 친구 랭킹 -->
      <div v-if="!isLoggedIn" class="non-member-message">
        <p>친구와 랭킹을 공유하고 싶다면 로그인하세요! ✨</p>
        <button @click="handleLogin">로그인/회원가입</button>
      </div>
      <div v-else class="friend-ranking">
        <FriendRanking :friends="friendsList" />
      </div>

      <!-- 인터뷰 준비 모드 배너: 취업 준비생들을 위한 특별한 모드! -->
      <InterviewPrepBanner />
    </main>
  </div>
</template>

<script>
import Header from '../components/AppHeader.vue'
import ChallengeSummaryCard from '../components/ChallengeSummaryCard.vue'
import TodaysProblemCTA from '../components/TodayProblemCTA.vue'
import InterviewPrepBanner from '../components/InterviewPrepBanner.vue'
import FriendRanking from '../components/FriendRanking.vue'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'MainScreen',
  components: {
    Header,
    ChallengeSummaryCard,
    TodaysProblemCTA,
    InterviewPrepBanner,
    FriendRanking,
  },
  data() {
    return {
      challengeStatus: '연속 3일 성공 중',
      friendsList: [],
    }
  },
  computed: {
    // Pinia store 인스턴스
    userStore() {
      return useUserStore()
    },
    // 로그인 여부
    isLoggedIn() {
      return this.userStore.isLoggedIn
    },
  },
  watch: {
    // 로그인 상태가 변하면 친구 목록 재조회
    isLoggedIn(newVal) {
      if (newVal) {
        this.fetchFriends()
      } else {
        this.friendsList = []
      }
    },
  },
  mounted() {
    // 마운트 시 이미 로그인 되어 있으면 친구 목록 로드
    if (this.isLoggedIn) {
      this.fetchFriends()
    }
  },
  methods: {
    // 친구 랭킹 API 호출
    async fetchFriends() {
      try {
        this.friendsList = await this.userStore.fetchFriends()
      } catch (err) {
        console.error('친구 목록 로드 실패', err)
      }
    },
    // 로그인/회원가입 처리 (모달 오픈 등)
    handleLogin() {
      console.log('로그인/회원가입 클릭')
      // TODO: 로그인 모달 열기 또는 라우팅
    },
    goToProblemSolving() {
      console.log('오늘의 문제 풀러 가자!')
      // TODO: 라우터 push 등
    },
    goToInterviewMode() {
      console.log('인터뷰 준비 모드로 고고!')
      // TODO: 인터뷰 준비 모드로 이동
    },
  },
}
</script>

<style scoped>
.main-screen {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color: #333;
  padding: 10px 20px;
  max-width: 80%;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  box-sizing: border-box;
}

.content-area {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.non-member-message {
  background-color: #ffe0b2;
  border: 1px solid #ffcc80;
  padding: 20px;
  border-radius: 12px;
  color: #e65100;
  font-size: 1.1em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.non-member-message:hover {
  transform: translateY(-3px);
}

.non-member-message p {
  margin-bottom: 15px;
  font-weight: bold;
}

.non-member-message button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.non-member-message button:hover {
  background-color: #fb8c00;
  transform: scale(1.02);
}

.friend-ranking {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.friend-ranking:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}
</style>
