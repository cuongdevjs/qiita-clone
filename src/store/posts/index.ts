import { Store } from 'vuex'
import { Mutations, Module, createMapper, Actions, Getters } from 'vuex-smart-module'
import moment from 'moment'

import { axios } from '@/resources/mockAxios'
import { delay } from '@/store/utils'
import { Post, HashMap } from '@/types'
import { mockPosts } from '@/resources/mockPosts'

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
    await axios.get<Post[]>('/posts')
    await delay()
    this.commit('SET_POSTS', mockPosts)
    this.commit('SUCCESS', {})
  }

  async fetchById(id: string) {
    this.commit('REQUEST', {})
    await axios.get<Post>(`/posts/${id}`)
    await delay()
    this.commit('ADD_POST', mockPosts[0])
    this.commit('SUCCESS', {})
  }

  async createPost(post: Post) {
    await axios.post<Post>('/posts', { post })
    await delay()
    this.commit('ADD_POST', {
      ...post,
      id: 100,
      authorId: 1,
      created: moment(),
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