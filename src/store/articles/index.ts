import random from 'lodash/random'
import { Store } from 'vuex'
import { Mutations, Module, createMapper, Actions, Getters } from 'vuex-smart-module'

import { IArticle } from '@/types'
import { mockArticles } from '@/resources/mockArticles'

function get<T>(url: string) { return Promise.resolve() }

const axios = {
  get
}

interface IHashMap<T> {
  [id: number]: T
}

class ArticlesState {
  ids: number[] = []
  all: IHashMap<IArticle> = {}
}

class ArticlesMutations extends Mutations<ArticlesState> {
  setArticles(payload: IArticle[]) {
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
    return new Promise(resolve => {
      setTimeout(async () => {
        await axios.get<IArticle[]>('/articles')
        this.commit('setArticles', mockArticles)
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