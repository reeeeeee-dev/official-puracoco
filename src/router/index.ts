import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/music',
      component: () => import('@/views/MusicView.vue'),
    },
    {
      path: '/tour',
      component: () => import('@/views/TourView.vue'),
    },
    {
      path: '/press',
      component: () => import('@/views/PressView.vue'),
    },
  ],
})

export default router
