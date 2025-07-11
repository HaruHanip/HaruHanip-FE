import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainView.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginView.vue')
  },
  { 
    path: '/oauth2/callback',
    name: 'CallBack',
    component: () => import('@/views/OAuthCallback.vue')
  },
  {
    path: '/problem',
    name: 'ProblemSolvingPage',
    component: () => import('@/views/ProblemSolvingView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('@/views/MyPageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// 글로벌 내비게이션 가드
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 1) 로그인 안 했으면 그냥 통과
  if (!userStore.isLoggedIn) {
    return next()
  }

  // 2) registStatus가 NOT_YET 이고, 현재 가려는 게 회원가입 페이지가 아니라면
  if (
    userStore.user.registStatus === 'NOT_YET' &&
    to.name !== 'Register'
  ) {
    // 강제 리다이렉트
    return next({ name: 'Register' })
  }

  // 3) 그 외에는 원래 가던 곳으로
  next()
})

export default router
