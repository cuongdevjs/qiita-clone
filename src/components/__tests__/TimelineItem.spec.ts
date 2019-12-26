import VueRouter from 'vue-router'
import CompositionApi from '@vue/composition-api'
import moment from 'moment'
import { mount, createLocalVue } from '@vue/test-utils'

jest.mock('../../resources/article.txt', () => '')
jest.mock('@/store/users', () => ({
  useUsers: () => ({
    getters: {
      getById: () => 'Username'
    }
  })
}))

const localVue = createLocalVue()
localVue.use(CompositionApi)
localVue.use(VueRouter)

import TimelineItem from '../TimelineItem.vue'
import { IArticle } from '@/types'


describe('TimelineItem', () => {
  it('renders information correctly', async () => {
    const article: IArticle = {
      id: 1,
      title: 'My article',
      content: 'Content',
      markdown: '',
      created: moment(),
      authorId: 1,
      likes: 10,
    }

    const wrapper = mount(TimelineItem, { 
      localVue,
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        article,
      }
    })

    const link = wrapper.find({ name: 'RouterLink' })
    expect(link.text()).toBe('My article')
    expect(link.attributes('href')).toBe('/posts/1')
  })

  it('triggers a like event', async () => {
    const article: IArticle = {
      id: 1,
      title: 'My article',
      content: 'Content',
      created: moment(),
      markdown: '',
      authorId: 1,
      likes: 10,
    }

    const wrapper = mount(TimelineItem, { 
      localVue,
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        article,
      }
    })

    wrapper.find('span').trigger('click')
    
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().like[0][0]).toEqual(article)
  })
})