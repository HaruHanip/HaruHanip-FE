<template>
  <div class="result-card">
    <p :class="isCorrect ? 'correct' : 'incorrect'" class="result-message">
      {{ isCorrect ? '정답입니다! 🎉' : `틀렸어요. 정답은 '${correct}' 입니다.` }}
    </p>
    <div class="explanation" v-if="explanation">
      <h4>해설</h4>
      <p>{{ explanation }}</p>
    </div>
    <button class="pill-btn" @click="emit('next')">다음 문제</button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isCorrect: boolean
  correct: number | string
  explanation?: string
}>(), {
  explanation: '',
})

const emit = defineEmits<{
  next: []
}>()
</script>

<style scoped>
.result-card {
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 24px 20px;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
}

.result-message {
  font-size: clamp(1rem, 4vw, 1.2rem);
  margin-bottom: 16px;
  font-weight: 600;
}

.correct { color: var(--color-primary); }
.incorrect { color: var(--color-danger); }

.explanation {
  text-align: left;
  background-color: #f9f9f9;
  border-left: 4px solid var(--color-blue);
  padding: 14px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.explanation h4 {
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #333333;
}

.explanation p {
  font-size: 0.9rem;
  color: #555555;
  line-height: 1.6;
}

.pill-btn {
  background-color: var(--color-blue);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  font-weight: 500;
  min-height: 48px;
  width: 100%;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.pill-btn:hover {
  background-color: var(--color-blue-dark);
  transform: translateY(-2px);
}
</style>
