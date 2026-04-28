<template>
  <div class="todays-problem-cta">
    <h2>오늘의 문제 풀기 💡</h2>
    <p>매일 새로운 문제로 실력을 쑥쑥 키워보세요!</p>
    <button @click="startProblem" class="btn-solve">
      오늘의 문제 풀러 가기! 👉
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startProblem() {
  router.push('/problem')
}
</script>

<style scoped>
.todays-problem-cta {
  background: linear-gradient(135deg, #bbdefb, #90caf9);
  border: 1px solid #64b5f6;
  padding: 28px 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
  text-align: center;
}

.todays-problem-cta:hover { transform: translateY(-4px); }

.todays-problem-cta h2 {
  color: #1976d2;
  margin-bottom: 10px;
  font-size: clamp(1.3rem, 4vw, 1.8rem);
  font-weight: bold;
}

.todays-problem-cta p {
  color: #2196f3;
  margin-bottom: 20px;
  font-size: clamp(0.9rem, 3vw, 1.1rem);
}

.btn-solve {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-size: clamp(1rem, 3.5vw, 1.2rem);
  font-weight: bold;
  min-height: 48px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-solve:hover {
  background-color: #1976d2;
  transform: scale(1.03);
}

@media (max-width: 640px) {
  .todays-problem-cta {
    padding: 20px 16px;
  }

  .btn-solve {
    width: 100%;
  }
}
</style>
