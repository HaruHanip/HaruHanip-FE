<template>
  <div class="result-card">
    <p :class="isCorrect ? 'correct' : 'incorrect'">
      {{ isCorrect ? '정답입니다! 🎉' : `틀렸어요. 정답은 '${correct}' 입니다.` }}
    </p>
    <button class="pill-btn" @click="$emit('next')">다음 문제</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({ isCorrect: Boolean, correct: String })
</script>

<style scoped>
/* styles reused from shared CSS */
</style>
