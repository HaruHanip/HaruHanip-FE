<!-- MainScreen.vue -->
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
       <p>기록을 남기고 싶다면 로그인하세요! ✨</p>
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
import Header from '../components/AppHeader.vue';
import ChallengeSummaryCard from '../components/ChallengeSummaryCard.vue';
import TodaysProblemCTA from '../components/TodayProblemCTA.vue';
import InterviewPrepBanner from '../components/InterviewPrepBanner.vue';
import FriendRanking from '../components/FriendRanking.vue'

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
      friendsList: [
    //    { name: '친구1', streak: 5 }, { name: '친구2', streak: 3 },
     ],
    };
  },
  methods: {
    goToProblemSolving() {
      console.log('오늘의 문제 풀러 가자!');
    },
    goToInterviewMode() {
      console.log('인터뷰 준비 모드로 고고!');
    },
  },
  mounted() {
    // 초기 로그인 상태 확인 로직
  }
};
</script>

<style scoped>
/* ✨ 메인 화면 전체 스타일 ✨ */
.main-screen {
  font-family: 'Noto Sans KR', sans-serif; /* 더 예쁜 한글 폰트! */
  text-align: center;
  color: #333;
  padding: 10px 20px; /* 위아래 여백을 좀 더 줘서 답답하지 않게! */
  max-width: 80%;
  margin: 0 auto;
  background-color: #f8f9fa; /* 아주 연한 회색 배경으로 부드럽게! */
  min-height: 100vh; /* 화면 전체를 채우도록! */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록! */
}

.content-area {
  margin-top: 30px; /* 헤더와 간격을 좀 더 줘요 */
  display: flex;
  flex-direction: column;
  gap: 25px; /* 컴포넌트들 사이 간격을 조금 더 넓게! */
}

/* 비회원 메시지 스타일 개선 */
.non-member-message {
  background-color: #ffe0b2; /* 따뜻한 오렌지 계열 색상! */
  border: 1px solid #ffcc80;
  padding: 20px;
  border-radius: 12px; /* 모서리를 더 둥글게! */
  color: #e65100; /* 진한 오렌지색 글씨 */
  font-size: 1.1em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가! */
  transition: transform 0.3s ease; /* 부드러운 효과 */
}

.non-member-message:hover {
  transform: translateY(-3px); /* 살짝 떠오르는 효과! */
}

.non-member-message p {
  margin-bottom: 15px;
  font-weight: bold;
}

.non-member-message button {
  background-color: #ff9800; /* 오렌지색 버튼! */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px; /* 알약 모양 버튼! */
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.non-member-message button:hover {
  background-color: #fb8c00; /* 호버 시 색상 진하게! */
  transform: scale(1.02); /* 살짝 커지는 효과! */
}

.friend-ranking {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.friend-ranking:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}
</style>
