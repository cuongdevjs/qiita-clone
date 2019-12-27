import Vue from 'vue'
import { inject } from 'vuex-smart-module'

import { PostsActions, PostsGetters, PostsMutations, IState } from '../'
import { mockPosts } from '@/resources/mockPosts'

jest.mock('../../../resources/post.txt', () => '')
jest.mock('../../../resources/post-plain.txt', () => '')

const createState = (): IState => ({
  ids: [],
  all: {},
  touched: false,
  loading: false,
})

describe('actions - fetchById', () => {
  it('fetches a post and commits mutations', async () => {
    const state = createState()
    const commit = jest.fn()
    const actions = inject(PostsActions, {
      state,
      commit
    })

    await actions.fetchById('1')

    expect(commit.mock.calls[0]).toEqual(['REQUEST', {}])
    expect(commit.mock.calls[1]).toEqual(['ADD_POST', mockPosts[0]])
    expect(commit.mock.calls[2]).toEqual(['SUCCESS', {}])
  })
})

describe('mutations - SET_POST', () => {
  it('inserts a post to the state', async () => {
    const state = createState()
    const commit = jest.fn()
    const mutations = inject(PostsMutations, {
      state,
    })

    mutations.ADD_POST(mockPosts[0])

    expect(state.all['1']).toEqual(mockPosts[0])
  })
})

describe('getters - posts', () => {
  it('returns the posts as an array', async () => { 
    const state = createState()
    const getters = inject(PostsGetters, {
      state: {
        ...state,
        all: { '1': mockPosts[0] },
        ids: [mockPosts[0].id],
      },
    })

    expect(getters.posts).toEqual([mockPosts[0]])
   })
})