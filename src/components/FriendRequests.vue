<template>
  <div class="friend-requests">
    <!-- 친구 요청 모달 오픈 버튼 -->
    <button class="btn-open-modal" @click="showModal = true">
      친구 요청
    </button>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h5>친구 요청 보내기</h5>
        <input
          v-model="newEmail"
          type="email"
          placeholder="친구의 이메일 입력"
          @keyup.enter="addFriend"
        />
        <div class="modal-actions">
          <button class="btn-confirm" @click="addFriend" :disabled="!newEmail">
            보내기
          </button>
          <button class="btn-cancel" @click="showModal = false">
            취소
          </button>
        </div>
      </div>
    </div>

    <!-- 받은 요청 리스트 -->
    <ul v-if="requests.length" class="request-list">
      <li v-for="req in requests" :key="req.friendId" class="request-item">
        <img :src="req.profileImageUrl || defaultAvatar" alt="프로필" class="avatar" />
        <span class="username">{{ req.requesterUsername }}</span>
        <div class="actions">
          <button class="btn-accept" @click="respond(req.friendId, true)">수락</button>
          <button class="btn-reject" @click="respond(req.friendId, false)">거절</button>
        </div>
      </li>
    </ul>
    <p v-else class="empty-text">받은 친구 요청이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/lib/axios'
import { defineEmits } from 'vue'

const requests   = ref([])
const newEmail   = ref('')
const showModal  = ref(false)
const defaultAvatar = '/src/assets/default-avatar.png'

async function loadRequests() {
  try {
    const res = await axios.get('/api/v1/friend/request')
    requests.value = res.data
  } catch (err) {
    console.error('친구 요청 조회 실패', err)
  }
}

async function respond(friendId, accept) {
  try {
    const payload = {
      friendId,
      friendStatus: accept ? 'ACCEPTED' : 'REJECTED'
    }
    await axios.post('/api/v1/friend/response', payload)
    await loadRequests()
    emit('updated-count', requests.value.length)
  } catch (err) {
    console.error('친구 요청 응답 실패', err)
  }
}

async function addFriend() {
  if (!newEmail.value) return
  try {
    await axios.post('/api/v1/friend/request', { email: newEmail.value })
    newEmail.value = ''
    showModal.value = false
    await loadRequests()
  } catch (err) {
    console.error('친구 요청 전송 실패', err)
  }
}

const emit = defineEmits(['updated-count'])

onMounted(loadRequests)
</script>

<style scoped>
.friend-requests {
  padding: 12px;
}
.friend-requests h4 {
  margin-bottom: 8px;
  font-size: 1.1em;
  color: #333;
}

/* 모달 오픈 버튼 */
.btn-open-modal {
  margin-bottom: 12px;
  padding: 6px 12px;
  background-color: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-open-modal:hover {
  background-color: #1e88e5;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* 모달 박스 */
.modal-content {
  background: #fff;
  padding: 20px;
  width: 90%;
  max-width: 320px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}
.modal-content h5 {
  margin-bottom: 12px;
  font-size: 1.1em;
  color: #333;
}
.modal-content input {
  width: 100%;
  height: 25px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

/* 모달 액션 버튼 */
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.btn-confirm,
.btn-cancel {
  flex: 1;
  padding: 6px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95em;
}
.btn-confirm {
  background-color: #4caf50;
  color: #fff;
}
.btn-confirm:disabled {
  background-color: #a5d6a7;
  cursor: default;
}
.btn-cancel {
  background-color: #f44336;
  color: #fff;
}

/* 받은 요청 리스트 스타일 */
.request-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.request-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
}
.avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.username {
  flex: 1;
  margin: 0 12px;
  font-size: 0.95em;
  color: #555;
}
.actions {
  display: flex;
  gap: 6px;
}
.btn-accept {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.85em;
}
.btn-reject {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.85em;
}
.empty-text {
  font-size: 0.9em;
  color: #888;
  text-align: center;
  margin-top: 12px;
}
</style>
