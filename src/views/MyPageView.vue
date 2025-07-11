<template>
  <Header :isLoggedIn="isLoggedIn" />

  <div class="my-page">
    <h1 class="page-title">마이페이지</h1>

    <!-- 프로필 섹션 -->
    <section class="card profile-section">
      <h2 class="card-title">프로필 정보</h2>
      <div class="profile-grid">
        <label class="avatar-upload" for="fileInput">
          <img :src="previewUrl" alt="아바타" class="avatar" />
          <input id="fileInput" type="file" accept="image/*" @change="onFileChange" />
        </label>
        <div class="profile-form">
          <label>
            닉네임
            <input v-model="form.nickname" type="text" />
          </label>
          <label>
            이메일
            <input v-model="form.email" type="text" disabled />
          </label>
          <label>
            생일
            <input v-model="form.birthday" type="date" />
          </label>
        </div>
      </div>
    </section>

    <!-- 챌린지 섹션 -->
    <section class="card challenge-section">
      <h2 class="card-title">참여 중인 챌린지</h2>
      <ul v-if="challenges.length" class="challenge-list">
        <li v-for="c in challenges" :key="c.userChallengeProgressId" class="challenge-item">
          <span class="challenge-name">{{ c.challengeResponse.name }}</span>
          <span :class="['challenge-status', { done: c.completed }]">
            {{ c.completed ? '완료' : c.currentStreak + '일 연속' }}
          </span>
        </li>
      </ul>
      <p v-else class="empty-text">참여 중인 챌린지가 없습니다.</p>
    </section>

    <!-- 히트맵 섹션 -->
    <section class="card heatmap-section">
      <h2 class="card-title">활동 히트맵</h2>
      <CalendarHeatmap
        :startDate="startDate"
        :endDate="endDate"
        :values="heatmapValues"
        :classForValue="classForValue"
        :tooltip-enabled="true"
        :weekStart="0"
        />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/lib/axios'
import { useUserStore } from '@/stores/userStore'
import Header from '@/components/AppHeader.vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import 'vue3-calendar-heatmap/dist/style.css'

// 인증 & 라우터
const userStore = useUserStore()
const router = useRouter()
const isLoggedIn = computed(() => !!userStore.isLoggedIn)
if (!isLoggedIn.value) router.replace({ name: 'Login' })

// 프로필 상태
const form = ref({
  userId: userStore.user.userId,
  nickname: userStore.user.nickname || '',
  email: userStore.user.email || '',
  birthday: userStore.user.birthday || ''
})
const selectedFile = ref(null)
const previewUrl = ref(userStore.user.profileImage || '/assets/default-avatar.png')
function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

// 챌린지 로드
const challenges = ref([])
async function loadChallenges() {
  try {
    const res = await axios.get('/api/v1/user/challenge')
    challenges.value = res.data
  } catch (e) {
    console.error('챌린지 로드 실패', e)
  }
}

// 히트맵 범위
const endDate = new Date()
const startDate = new Date()
startDate.setFullYear(endDate.getFullYear() - 1)

// 빈 히트맵 생성
function generateEmptyHeatmap() {
  const vals = []
  const d = new Date(startDate)
  while (d <= endDate) {
    vals.push({ date: d.toISOString().slice(0, 10), count: 0 })
    d.setDate(d.getDate() + 1)
  }
  return vals
}
const heatmapValues = ref(generateEmptyHeatmap())

async function loadHeatmap() {
  try {
    const res = await axios.get('/api/v1/user/activity-heatmap')
    heatmapValues.value = res.data && res.data.length ? res.data : generateEmptyHeatmap()
  } catch {
    heatmapValues.value = generateEmptyHeatmap()
  }
}

// 클래스, 툴팁
function classForValue(v) {
  if (!v || !v.count) return 'color-empty'
  if (v.count >= 10) return 'color-github-4'
  if (v.count >= 5) return 'color-github-3'
  if (v.count >= 2) return 'color-github-2'
  return 'color-github-1'
}
function tooltipFn(v) {
  return v && v.count ? `${v.date}: ${v.count}회 활동` : `${v.date}: 활동 없음`
}

// 초기화
onMounted(() => {
  loadChallenges()
  loadHeatmap()
})
</script>

<style scoped>
  .my-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px;
    font-family: 'Segoe UI', sans-serif;
    color: #333;
  }
.page-title {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2rem;
  color: #2c3e50;
}

/* 카드 기본 */
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 24px;
  padding: 20px;
}
.card-title {
  margin-bottom: 16px;
  font-size: 1.25rem;
  border-bottom: 2px solid #42a5f5;
  display: inline-block;
  padding-bottom: 4px;
  color: #42a5f5;
}

/* 프로필 그리드 */
.profile-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  align-items: start;
}
.avatar-upload {
  position: relative;
  cursor: pointer;
}
.avatar-upload input[type="file"] {
  display: none;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #42a5f5;
}
.profile-form label {
  display: block;
  margin-bottom: 12px;
  font-size: 0.9rem;
}
.profile-form input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  box-sizing: border-box;
}
.btn {
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-primary {
  background: #42a5f5;
  color: #fff;
  padding: 8px 16px;
  transition: background .2s;
}
.btn-primary:disabled {
  background: #90caf9;
  cursor: not-allowed;
}
.msg {
  margin-top: 8px;
  font-size: 0.85rem;
}
.msg.error { color: #e74c3c; }
.msg.success { color: #27ae60; }

/* 챌린지 리스트 */
.challenge-list,
.friend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.challenge-item,
.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}
.challenge-item:last-child,
.friend-item:last-child {
  border-bottom: none;
}
.challenge-name {
  font-weight: 600;
}
.challenge-status {
  font-size: 0.9rem;
  padding: 4px 8px;
  border-radius: 12px;
  background: #e3f2fd;
  color: #1e88e5;
}
.challenge-status.done {
  background: #e8f5e9;
  color: #2e7d32;
}
.empty-text {
  text-align: center;
  color: #999;
  padding: 16px 0;
}
.avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

/* 히트맵 섹션 */
.heatmap-section {
  text-align: center;
}
.heatmap-section .calendar-heatmap {
  margin: 0 auto;
}

/* GitHub 스타일 색상 */
.color-empty     { fill: #ebedf0; }
.color-github-1  { fill: #9be9a8; }
.color-github-2  { fill: #40c463; }
.color-github-3  { fill: #30a14e; }
.color-github-4  { fill: #216e39; }

/* 반응형 */
@media (max-width: 600px) {
  .profile-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .profile-form {
    text-align: left;
  }
}
</style>
