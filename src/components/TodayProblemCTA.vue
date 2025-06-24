<!-- components/TodaysProblemCTA.vue -->
<template>
  <div class="todays-problem-cta">
    <h2>오늘의 문제 풀기 💡</h2>
    <p>매일 새로운 문제로 실력을 쑥쑥 키워보세요!</p>
    <button @click="startProblem" class="btn-solve">
      오늘의 문제 풀러 가기! 👉
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function startProblem() {
  router.push('/problem')
}
</script>

<style scoped>
/* ✨ 오늘의 문제 CTA 스타일 ✨ */
.todays-problem-cta {
  background: linear-gradient(135deg, #bbdefb, #90caf9); /* 시원한 파란색 그라데이션! */
  border: 1px solid #64b5f6;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.todays-problem-cta:hover {
  transform: translateY(-5px);
}

.todays-problem-cta h2 {
  color: #1976d2; /* 진한 파란색 */
  margin-bottom: 15px;
  font-size: 1.8em;
  font-weight: bold;
}

.todays-problem-cta p {
  color: #2196f3; /* 중간 파란색 */
  margin-bottom: 25px;
  font-size: 1.15em;
}

.todays-problem-cta .btn-solve {
  background-color: #2196f3; /* 파란색 버튼! */
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px; /* 더 둥근 알약 모양! */
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 버튼에도 그림자! */
}

.todays-problem-cta .btn-solve:hover {
  background-color: #1976d2; /* 호버 시 색상 진하게! */
  transform: scale(1.03); /* 살짝 커지는 효과! */
}
</style>