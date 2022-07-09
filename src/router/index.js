import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/url',
  //   name: 'UrlName',
  //   component: () => import('@/views/View.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
