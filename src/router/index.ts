import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('../views/Home.vue')  
  },
  { 
    path: '/works', 
    name: 'Works', 
    component: () => import('../views/Works.vue') 
  },
  { 
    path: '/about', 
    name: 'About', 
    component: () => import('../views/About.vue') 
  },
  {
    path: '/works/:id',  // :id 是动态参数，会匹配不同的作品ID
    name: 'WorkDetail',
    component: () => import('../views/WorkDetail.vue')
  },  
  {
    path: '/works/:workId/character/:characterId', 
    name: 'CharacterDetail', 
    component: () => import('../views/CharacterDetail.vue'), 
  },
  { path: '/works/:workId/parallel-world/:auId', 
    name: 'ParallelWorldDetail', 
    component: () => import('../views/ParallelWorldDetail.vue'), 
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
