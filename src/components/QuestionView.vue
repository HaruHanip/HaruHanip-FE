<template>
  <div class="question-card">
    <h3 class="question-title">문제 {{ index }} / {{ total }}</h3>
    <p class="question-text">{{ question.text }}</p>

    <ul class="options">
      <li v-for="(opt, i) in question.options" :key="i">
        <button
          class="option-btn"
          @click="submit(opt)"
        >
          <span class="option-label">{{ i + 1 }}</span>
          <span class="option-text"> {{ opt }} </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  question: { type: Object, required: true },
  index:    { type: Number, required: true },
  total:    { type: Number, required: true },
})
const emit = defineEmits(['submit'])
function submit(opt) {
  emit('submit', opt)
}
</script>

<style scoped>
/* (이전 스타일에서 .correct/.incorrect 부분 제거) */
</style>
