import { createRouter, createWebHistory } from 'vue-router'
import Standings from '../views/Standings.vue'

const routes = [
  {
    path: '/',
    name: 'Standings',
    component: Standings
  },
  {
    path: '/scores',
    name: 'Scores',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Scores.vue')
  },
  {
    path: '/input-game',
    name: 'InputGame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InputGame.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
