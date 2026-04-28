<template>
  <div class="category-select">
    <h2>문제 분야를 선택하세요</h2>
    <ul>
      <li
        v-for="cat in categories"
        :key="cat.categoryId"
        @click="emit('select', cat)"
        class="category-item"
      >
        {{ cat.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/api'

defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  select: [category: Category]
}>()
</script>

<style scoped>
.category-select {
  text-align: center;
  padding: 20px 0;
}

.category-select h2 {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  margin-bottom: 20px;
  color: var(--color-text);
}

.category-select ul {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  list-style: none;
}

.category-item {
  background: #eef2ff;
  color: #4338ca;
  padding: 12px 22px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-size: clamp(0.9rem, 3vw, 1rem);
  min-height: 48px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .category-select ul {
    gap: 8px;
  }

  .category-item {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
}
</style>
