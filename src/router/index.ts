import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts/:id?',
    name: 'posts',
    component: Posts
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
