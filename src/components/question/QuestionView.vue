<template>
  <div class="question-card">
    <h3 class="question-title">문제 {{ index }} / {{ total }}</h3>
    <p class="question-text">{{ question.title }}</p>

    <ul class="options">
      <li v-for="opt in question.options" :key="opt.option_index">
        <button
          class="option-btn"
          @click="emit('submit', opt.option_index)"
        >
          <span class="option-label">{{ opt.option_index }}</span>
          <span class="option-text">{{ opt.content }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Problem } from '@/types/api'

defineProps<{
  question: Problem
  index: number
  total: number
}>()

const emit = defineEmits<{
  submit: [optionIndex: number]
}>()
</script>

<style scoped>
.question-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 24px;
  margin: 12px auto;
  width: 100%;
  max-width: 720px;
  text-align: left;
}

.question-title {
  font-size: clamp(1rem, 3.5vw, 1.3rem);
  color: #3730a3;
  margin-bottom: 14px;
}

.question-text {
  font-size: clamp(1rem, 3.5vw, 1.2rem);
  color: #1f2937;
  margin-bottom: 20px;
  line-height: 1.6;
}

.options {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  width: 100%;
  min-height: 52px;
  text-align: left;
  transition: background-color 0.2s, border-color 0.2s;
}

.option-btn:hover {
  background-color: #e2e8f0;
  border-color: #94a3b8;
}

.option-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #e0e7ff;
  color: #3730a3;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-right: 12px;
}

.option-text {
  flex: 1;
  font-size: clamp(0.9rem, 3vw, 1rem);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .question-card {
    padding: 18px 14px;
    margin: 8px auto;
  }

  .option-btn {
    padding: 10px 12px;
    min-height: 48px;
  }
}
</style>
