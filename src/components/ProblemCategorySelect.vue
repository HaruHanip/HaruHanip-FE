<template>
  <div class="category-select">
    <h2>문제 분야를 선택하세요</h2>
    <ul>
      <li
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat)"
        class="category-item"
      >
        {{ cat.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  categories: { type: Array, required: true }
})
const emit = defineEmits(['select'])
function select(cat) {
  emit('select', cat)
}
</script>

<style scoped>
.category-select {
  text-align: center;
}
.category-select ul {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}
.category-select li {
  background: #eef2ff;
  color: #4338ca;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.category-select li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>