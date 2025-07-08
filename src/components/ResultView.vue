<template>
  <div class="result-card">
    <!-- 정답 여부 메시지 -->
    <p :class="isCorrect ? 'correct' : 'incorrect'" class="result-message">
      {{ isCorrect ? '정답입니다! 🎉' : `틀렸어요. 정답은 '${correct}' 입니다.` }}
    </p>
    <!-- 해설 메시지 -->
    <div class="explanation" v-if="explanation">
      <h4>해설</h4>
      <p>{{ explanation }}</p>
    </div>
    <!-- 다음 문제 버튼 -->
    <button class="pill-btn" @click="$emit('next')">다음 문제</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  isCorrect: {
    type: Boolean,
    required: true
  },
  correct: {
    type: [String, Number],
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.result-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.result-message {
  font-size: 1.2em;
  margin-bottom: 16px;
  font-weight: 600;
}

.correct {
  color: #4caf50;
}

.incorrect {
  color: #f44336;
}

.explanation {
  text-align: left;
  background-color: #f9f9f9;
  border-left: 4px solid #42a5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.explanation h4 {
  margin: 0 0 8px;
  font-size: 1em;
  color: #333333;
}

.explanation p {
  margin: 0;
  font-size: 0.95em;
  color: #555555;
}

.pill-btn {
  background-color: #42a5f5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.pill-btn:hover {
  background-color: #1e88e5;
  transform: translateY(-2px);
}
</style>