import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue';
import Posts from '@/views/Posts.vue';
import Create from '@/views/Create.vue';
import Edit from '@/views/Edit.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: Home
  },
  {
      name: 'create',
      path: '/create',
      component: Create
  },
  {
      name: 'posts',
      path: '/posts',
      component: Posts
  },
  {
      name: 'edit',
      path: '/edit/:id',
      component: Edit
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
