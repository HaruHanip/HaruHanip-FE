<template>
  <div class="summary-card">
    <h2>문제 풀이 완료!</h2>
    <p>총 {{ correctCount }} / {{ total }} 개 정답</p>
    <button class="pill-btn" @click="$emit('restart')">다시 풀기</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({ correctCount: Number, total: Number })
</script>

<style scoped>
/* styles reused from shared CSS */
</style>
