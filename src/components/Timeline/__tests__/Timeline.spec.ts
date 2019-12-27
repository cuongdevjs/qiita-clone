import VueRouter from 'vue-router'
import CompositionApi from '@vue/composition-api'
import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import { article } from '@/resources/factories'

let mockLoading = true
let mockTouched = true

jest.mock('../../../resources/article.txt', () => '')

jest.mock('@/store/users', () => ({
  useUsers: () => ({
    getters: {
      getById: () => 'Username'
    }
  })
}))

jest.mock('@/store/articles', () => ({
  useArticles: () => ({
    state: {
      loading: mockLoading,
      touched: mockTouched,
    },
    actions: {
      fetchAll: () => Promise.resolve()
    },
    getters: {
      articles: [
        { ...article, id: 1 },
        { ...article, id: 2 }
      ]
    }
  })
}))


const localVue = createLocalVue()
localVue.use(CompositionApi)
localVue.use(VueRouter)

import Timeline from '../Timeline.vue'
import TimelineItem from '../TimelineItem.vue'


describe('Timeline', () => {
  it('renders Loading when articles are not loaded', async () => {
    mockLoading = true
    const wrapper = mount(Timeline, {
      localVue: createLocalVue(),
      stubs: {
        Portal: true
      }
    })

    expect(wrapper.find('[data-test-loading]').exists()).toBe(true)
  })

  it('renders when articles when loaded', async () => {
    mockLoading = false
    const wrapper = mount(Timeline, {
      localVue: createLocalVue(),
      stubs: {
        Portal: true
      },
      data() {
        return { loading: false }
      }
    })

    expect(wrapper.findAll(TimelineItem)).toHaveLength(2)
  })

  it('changes period when tab is clicked', async () => {
    mockLoading = false

    const wrapper = mount(Timeline, {
      localVue: createLocalVue(),
      stubs: {
        Portal: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('[data-test-tab="Today"]').classes()
    ).toContain('is-active')

    wrapper.find('[data-test-tab="This Week"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('[data-test-tab="This Week"]').classes()
    ).toContain('is-active')
  })
})