import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { createStore, Module } from 'vuex-smart-module'

import { posts } from './posts'
import { users } from './users'

const root = new Module({
  modules: {
    posts,
    users,
  }
})

const store = createStore(root)

const useStore = () => store

export {
  useStore,
  store,
}