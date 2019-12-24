import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { createStore, Module } from 'vuex-smart-module'

import { articles } from './articles'


const root = new Module({
  modules: {
    articles
  }
})

const store = createStore(root)

const useStore = () => store

export {
  useStore,
  store,
}