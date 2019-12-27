import { Store } from 'vuex'
import { Mutations, Module, createMapper, Actions, Getters } from 'vuex-smart-module'
import random from 'lodash/random'
import { axios } from '@/resources/mockAxios'

import { Post, HashMap } from '@/types'
import { mockPosts } from '@/resources/mockPosts'
import { mockUsers } from '@/resources/mockUsers'
import moment from 'moment'

class PostsState {
  ids: number[] = []
  all: HashMap<Post> = {}
  loading = false
  touched = false
}

class PostsMutations extends Mutations<PostsState> {
  REQUEST(payload = {}) {
    this.state.touched = true
    this.state.loading = true
  }

  SUCCESS(payload = {}) {
    this.state.loading = false    
  }

  ADD_POST(post: Post) {
    this.state.all = { 
      ...this.state.all,
      [post.id]: post
    }
    this.state.ids.push(post.id)
  }

  SET_POSTS(payload: Post[]) {
    const all: HashMap<Post> = {}
    const ids: number[] = []

    for (const a of payload) {
      ids.push(a.id)
      all[a.id] = a
    }

    this.state.all = all
    this.state.ids = ids
  }
}

class PostsGetters extends Getters<PostsState> {
  get posts() {
    return this.state.ids.map(x => this.state.all[x])
  }
}

class PostsActions extends Actions<
  PostsState,
  PostsGetters,
  PostsMutations,
  PostsActions
  > {
  async fetchAll() {
    this.commit('REQUEST', {})
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.get<Post[]>('/posts')
        this.commit('SET_POSTS', mockPosts)
        this.commit('SUCCESS', {})
        resolve()
      }, random(500, 2000))
    })
  }

  async fetchById(id: string) {
    this.commit('REQUEST', {})
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.get<Post>(`/posts/${id}`)
        this.commit('ADD_POST', mockPosts[0])
        this.commit('SUCCESS', {})
        resolve()
      }, random(500, 2000))
    })
  }

  async createPost(post: Post) {
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.post<Post>('/posts', { post })
        this.commit('ADD_POST', { 
          ...post,
          id: 100,
          authorId: 1,
          created: moment(),
        })
        resolve()
      }, random(500, 2000))
    })
  }
}

const posts = new Module({
  state: PostsState,
  mutations: PostsMutations,
  actions: PostsActions,
  getters: PostsGetters,
})

const postsMapper = createMapper(posts)

const usePosts = ($store: Store<undefined>) => {
  return posts.context($store)
}


export {
  postsMapper,
  usePosts,
  posts,
}