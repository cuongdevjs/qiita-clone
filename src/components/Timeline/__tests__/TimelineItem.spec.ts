import VueRouter from 'vue-router'
import CompositionApi from '@vue/composition-api'
import { mount, createLocalVue } from '@vue/test-utils'

jest.mock('../../../resources/post.txt', () => '')
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
import { Post } from '@/types'
import { post as mockPost } from '@/resources/factories'


describe('TimelineItem', () => {
  it('renders information correctly', async () => {
    const post: Post = {
      ...mockPost,
      id: 1,
      title: 'My post',
    }

    const wrapper = mount(TimelineItem, { 
      localVue,
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        post,
      }
    })

    const link = wrapper.find({ name: 'RouterLink' })
    expect(link.text()).toBe('My post')
    expect(link.attributes('href')).toBe('/posts/1')
  })

  it('triggers a like event', async () => {
    const post: Post = {
      ...mockPost,
      id: 1,
      title: 'My post',
    }

    const wrapper = mount(TimelineItem, { 
      localVue,
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        post,
      }
    })

    wrapper.find('span').trigger('click')
    
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().like[0][0]).toEqual(post)
  })
})