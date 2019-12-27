import { Store } from 'vuex'
import { Mutations, Module, createMapper, Actions, Getters } from 'vuex-smart-module'
import random from 'lodash/random'
import { axios } from '@/resources/mockAxios'

import { IArticle, IHashMap } from '@/types'
import { mockArticles } from '@/resources/mockArticles'
import { mockUsers } from '@/resources/mockUsers'
import moment from 'moment'

class ArticlesState {
  ids: number[] = []
  all: IHashMap<IArticle> = {}
  loading = false
  touched = false
}

class ArticlesMutations extends Mutations<ArticlesState> {
  REQUEST(payload = {}) {
    this.state.touched = true
    this.state.loading = true
  }

  SUCCESS(payload = {}) {
    this.state.loading = false    
  }

  ADD_ARTICLE(article: IArticle) {
    this.state.all = { 
      ...this.state.all,
      [article.id]: article
    }
    this.state.ids.push(article.id)
  }

  SET_ARTICLES(payload: IArticle[]) {
    const all: IHashMap<IArticle> = {}
    const ids: number[] = []

    for (const a of payload) {
      ids.push(a.id)
      all[a.id] = a
    }

    this.state.all = all
    this.state.ids = ids
  }
}

class ArticlesGetters extends Getters<ArticlesState> {
  get articles() {
    return this.state.ids.map(x => this.state.all[x])
  }
}

class ArticlesActions extends Actions<
  ArticlesState,
  ArticlesGetters,
  ArticlesMutations,
  ArticlesActions
  > {
  async fetchAll() {
    this.commit('REQUEST', {})
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.get<IArticle[]>('/articles')
        this.commit('SET_ARTICLES', mockArticles)
        this.commit('SUCCESS', {})
        resolve()
      }, random(500, 2000))
    })
  }

  async fetchById(id: string) {
    this.commit('REQUEST', {})
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.get<IArticle>(`/articles/${id}`)
        this.commit('ADD_ARTICLE', mockArticles[0])
        this.commit('SUCCESS', {})
        resolve()
      }, random(500, 2000))
    })
  }

  async createPost(article: IArticle) {
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.post<IArticle>('/articles', { article })
        this.commit('ADD_ARTICLE', { 
          ...article,
          id: 100,
          authorId: 1,
          created: moment(),
        })
        resolve()
      }, random(500, 2000))
    })
  }
}

const articles = new Module({
  state: ArticlesState,
  mutations: ArticlesMutations,
  actions: ArticlesActions,
  getters: ArticlesGetters,
})

const articlesMapper = createMapper(articles)

const useArticles = ($store: Store<undefined>) => {
  return articles.context($store)
}


export {
  articlesMapper,
  useArticles,
  articles,
}