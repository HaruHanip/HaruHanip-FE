<template>
  <div class="friend-ranking-card">
    <h3 class="title">친구 랭킹</h3>
    <ul class="friend-list">
      <li v-for="(friend, index) in props.friends" :key="index" class="friend-item">
        <span class="rank">{{ index + 1 }}위</span>
        <span class="name">{{ friend.name }}</span>
        <span class="streak">연속 {{ friend.streak }}일</span>
      </li>
      <li v-if="!props.friends || props.friends.length === 0" class="no-friends">
        아직 친구가 없어요. 친구를 추가해보세요! 😊
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// defineProps를 통해 받은 props 객체를 활용하여 reactivity 유지
const props = defineProps({
  friends: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.friend-ranking-card {
  background-color: #eef2ff;
  border: 1px solid #c3dafe;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b4cca;
}

.friend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #dbeafe;
}

.friend-item:last-child {
  border-bottom: none;
}

.rank {
  font-weight: 500;
  width: 50px;
  color: #1e3a8a;
}

.name {
  flex: 1;
  color: #1f2937;
}

.streak {
  font-size: 0.95rem;
  color: #2563eb;
}

.no-friends {
  text-align: center;
  color: #6b7280;
  padding: 16px 0;
}
</style>