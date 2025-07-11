<template>
  <header class="app-header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="로고" />
      </router-link>
    </div>
    <nav class="nav-links">
      <!-- 로그인 전 -->
      <button
        v-if="!isLoggedIn"
        @click="onLogin"
        class="btn btn-login"
      >
        로그인/회원가입
      </button>

      <!-- 로그인 후: 친구 메뉴 + 프로필 메뉴 -->
      <div v-else class="user-controls">
        <!-- 프로필 메뉴 -->
        <div class="profile-menu-container">
          <button
            @click="toggleProfileMenu"
            class="btn btn-icon btn-profile"
            aria-label="프로필 메뉴"
          >
            <img
              :src="userStore.user.profileImage || defaultAvatar"
              alt="프로필"
              class="profile-icon"
            />
          </button>
          <ul v-if="showProfileMenu" class="profile-dropdown">
            <li @click="goToMyPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="dropdown-icon"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path d="M6 20v-1c0-2.76 2.24-5 5-5s5 2.24 5 5v1" />
              </svg>
              마이페이지
            </li>
            <li @click="onLogout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="dropdown-icon"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M5 4v16" />
              </svg>
              로그아웃
            </li>
          </ul>
        </div>

        <!-- 친구 메뉴 -->
        <div class="friend-menu-container">
          <button
            @click="toggleFriendMenu"
            class="btn btn-icon btn-friend"
            aria-label="친구 메뉴"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="icon"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span v-if="pendingCount > 0" class="badge">
              {{ pendingCount }}
            </span>
          </button>
          <div v-if="showFriendMenu" class="friend-dropdown">
            <div class="tabs">
              <button
                :class="['tab-button', activeTab === 'list' && 'active']"
                @click="activeTab = 'list'"
              >
                친구 목록
              </button>
              <button
                :class="['tab-button', activeTab === 'requests' && 'active']"
                @click="activeTab = 'requests'"
              >
                친구 요청
              </button>
            </div>
            <div class="tab-content">
              <FriendList v-if="activeTab === 'list'" />
              <FriendRequests
                v-if="activeTab === 'requests'"
                @updated-count="loadPendingCount"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from '@/lib/axios'
import FriendList from '@/components/FriendList.vue'
import FriendRequests from '@/components/FriendRequests.vue'

const router    = useRouter()
const userStore = useUserStore()
const isLoggedIn = computed(() => !!userStore.user?.userId)
const defaultAvatar = '/assets/default-avatar.png'

// 친구 요청 대기 개수 조회
const pendingCount = ref(0)
async function loadPendingCount() {
  if (!userStore.user?.userId) {
    pendingCount.value = 0
    return
  }
  try {
    const res = await axios.get('/api/v1/friend/request')
    pendingCount.value = Array.isArray(res.data) ? res.data.length : 0
  } catch {
    pendingCount.value = 0
  }
}

// 친구 드롭다운
const showFriendMenu = ref(false)
const activeTab      = ref('list')
const showProfileMenu = ref(false)

// in your <script setup>
function toggleFriendMenu() {
  showFriendMenu.value = !showFriendMenu.value
  if (showFriendMenu.value) {
    // if we just opened the friend menu, force‐close the profile menu
    showProfileMenu.value = false
    loadPendingCount()
  }
}

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
  if (showProfileMenu.value) {
    // if we just opened the profile menu, force‐close the friend menu
    showFriendMenu.value = false
  }
}

// 라우팅
function onLogin()    { router.push('/login') }
function goToMyPage() { router.push('/mypage') }
function onLogout()   { userStore.logout(); router.push('/') }

// 로그인 상태 바뀔 때 카운트 갱신
watch(isLoggedIn, val => {
  if (val) loadPendingCount()
  else pendingCount.value = 0
}, { immediate: true })

// 초기 로드
onMounted(() => {
  if (isLoggedIn.value) loadPendingCount()
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.logo img {
  max-height: 50px;
  width: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-login {
  background: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
}

/* common icon button */
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  position: relative;
}

/* friend icon */
.btn-friend .icon {
  width: 20px;
  height: 20px;
  stroke: #607d8b;
}
.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53935;
  color: #fff;
  border-radius: 50%;
  padding: 0 5px;
  font-size: 0.7em;
}

/* profile avatar */
.btn-profile .profile-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

/* container flex for side-by-side */
.user-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.friend-menu-container,
.profile-menu-container {
  position: relative;
}

/* dropdown common */
.friend-dropdown,
.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.friend-dropdown {
  width: 280px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

/* 2) Prevent the tab buttons from wrapping their text: */
.friend-dropdown .tab-button {
  white-space: nowrap;
  text-align: center;
}

/* 3) (Optional) Center the tab text vertically/horizontally: */
.friend-dropdown .tabs {
  display: flex;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}

/* 탭 버튼 */
.friend-dropdown .tab-button {
  flex: 1;
  padding: 12px 0;
  font-size: 0.95em;
  font-weight: 500;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.friend-dropdown .tab-button:hover {
  background: #f5f5f5;
}

/* 활성 탭 강조 */
.friend-dropdown .tab-button.active {
  color: #42a5f5;
  border-bottom: 3px solid #42a5f5;
  background: #fff;
}

/* 탭 콘텐츠 영역 */
.friend-dropdown .tab-content {
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
}

/* tabs in friend-dropdown */
.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}
.tab-button {
  flex: 1;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
}
.tab-button.active {
  background: #f0f0f0;
  font-weight: 600;
}
.tab-content {
  max-height: 300px;
  overflow-y: auto;
}

/* profile-dropdown list */
.profile-dropdown {
  list-style: none;
  margin: 0;
  padding: 8px 0;
  width: 140px;
}
.profile-dropdown li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.profile-dropdown li:hover {
  background: #f5f5f5;
}
.dropdown-icon {
  width: 16px;
  height: 16px;
  stroke: #555;
  flex-shrink: 0;
}
</style>
