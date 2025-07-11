<template>
  <div class="friend-list">
    <h4>친구 목록</h4>
    <ul v-if="friends.length">
      <li v-for="f in friends" :key="f.userId" class="friend-item">
        <img :src="f.profileImageUrl || defaultAvatar" alt="프로필" class="avatar" />
        <span class="username">{{ f.nickname }}</span>
        <button class="btn-delete" @click="confirmRemove(f.userId)">✕</button>
      </li>
    </ul>
    <p v-else class="empty-text">친구가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const friends = ref([])
const defaultAvatar = '/assets/default-avatar.png'

async function loadFriends() {
  try {
    const res = await axios.get('/api/v1/friend')
    friends.value = res.data
  } catch (err) {
    console.error('친구 목록 조회 실패', err)
  }
}

async function removeFriend(friendId) {
  try {
    const payload = { friendId }
    await axios.delete('/api/v1/friend', { data: payload })
    await loadFriends()
  } catch (err) {
    console.error('친구 삭제 실패', err)
  }
}


function confirmRemove(friendId) {
  if (window.confirm('정말로 친구를 삭제하시겠습니까?')) {
    removeFriend(friendId)
  }
}

onMounted(loadFriends)
</script>

<style scoped>
.friend-list {
  padding: 12px;
  text-align: center;
}
.friend-list h4 {
  margin-bottom: 12px;
  font-size: 1.2em;
  color: #333;
}
.friend-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.friend-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f9f9f9;
  padding: 8px 12px;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.username {
  flex: 1;
  font-size: 0.95em;
  color: #555;
  text-align: left;
}
.btn-delete {
  background: none;
  border: none;
  color: #e53935;
  font-size: 1em;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.btn-delete:hover {
  background-color: rgba(229, 57, 53, 0.1);
}
.empty-text {
  font-size: 0.9em;
  color: #888;
  margin-top: 12px;
}
</style>
