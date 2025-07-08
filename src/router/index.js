import { createRouter, createWebHistory } from 'vue-router'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
