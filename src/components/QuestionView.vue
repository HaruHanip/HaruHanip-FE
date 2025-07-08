<template>
  <div class="question-card">
    <h3 class="question-title">문제 {{ props.index }} / {{ props.total }}</h3>
    <p class="question-text">{{ props.question.title }}</p>

    <ul class="options">
      <li v-for="(opt, i) in props.question.options" :key="i">
        <button
          class="option-btn"
          @click="$emit('submit', opt.option_index)"
        >
          <span class="option-label">{{ i + 1 }}</span>
          <span class="option-text">{{ opt.content }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure */
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  index:    { type: Number, required: true },
  total:    { type: Number, required: true }
})
const emit = defineEmits(['submit'])
</script>

<style scoped>
.question-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 20px auto;
  font-family: 'Noto Sans KR', sans-serif;
  width: 80%;
  text-align: left;
}

.question-title {
  font-size: 1.4em;
  color: #3730a3;
  margin-bottom: 12px;
}

.question-text {
  font-size: 1.2em;
  color: #1f2937;
  margin-bottom: 20px;
}

.options {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.options li {
  margin-bottom: 12px;
}

.option-btn {
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.option-label {
  display: inline-block;
  width: 24px;
  font-weight: bold;
  margin-right: 12px;
}

.option-text {
  flex: 1;
  font-size: 1em;
}
</style>
