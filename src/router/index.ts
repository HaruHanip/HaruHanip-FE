import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/main-view.vue'),
    meta: { guest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login-view.vue'),
    meta: { guest: true },
  },
  {
    path: '/oauth2/callback',
    name: 'OAuthCallback',
    component: () => import('@/pages/oauth-callback.vue'),
    meta: { guest: true },
  },
  {
    path: '/problem',
    name: 'ProblemSolving',
    component: () => import('@/pages/problem-solving-view.vue'),
    meta: { guest: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && userStore.isGuest) {
    return { name: 'Login' }
  }
})

export default router
