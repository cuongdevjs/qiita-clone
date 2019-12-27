import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Login from '../views/Login.vue'
import NewPost from '../views/NewPost.vue'
import EditPost from '../views/EditPost.vue'
import NewUser from '../views/NewUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts/new',
    name: 'new-posts',
    component: NewPost,
  },
  {
    path: '/posts/:id/edit',
    name: 'edit-post',
    component: EditPost
  },
  {
    path: '/posts/:id?',
    name: 'posts',
    component: Posts
  },
  {
    path: '/users/new',
    name: 'new-user',
    component: NewUser,
  },
  {
    path: '/users/login',
    name: 'login',
    component: Login,
  },
]

// @ts-ignore
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
