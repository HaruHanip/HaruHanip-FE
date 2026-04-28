<template>
  <div class="friend-ranking-card">
    <h3 class="title">친구 랭킹</h3>
    <ul class="friend-list">
      <li v-for="(friend, index) in friends" :key="index" class="friend-item">
        <span class="rank">{{ index + 1 }}위</span>
        <span class="name">{{ friend.name }}</span>
        <span class="streak">연속 {{ friend.streak }}일</span>
      </li>
      <li v-if="friends.length === 0" class="no-friends">
        아직 친구가 없어요. 친구를 추가해보세요! 😊
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Friend {
  name: string
  streak: number
}

withDefaults(defineProps<{
  friends: Friend[]
}>(), {
  friends: () => [],
})
</script>

<style scoped>
.friend-ranking-card {
  background-color: #eef2ff;
  border: 1px solid #c3dafe;
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-md);
}

.title {
  margin-bottom: 12px;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  color: #3b4cca;
}

.friend-list {
  list-style: none;
}

.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dbeafe;
  gap: 8px;
}

.friend-item:last-child { border-bottom: none; }

.rank { font-weight: 500; width: 44px; color: #1e3a8a; flex-shrink: 0; }
.name { flex: 1; color: #1f2937; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.streak { font-size: 0.9rem; color: #2563eb; flex-shrink: 0; }

.no-friends {
  text-align: center;
  color: #6b7280;
  padding: 16px 0;
  font-size: 0.95rem;
}
</style>
