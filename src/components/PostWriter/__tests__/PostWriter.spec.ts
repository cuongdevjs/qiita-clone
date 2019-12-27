import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import PostWriter from '../PostWriter.vue'
import { article } from '@/resources/factories'

describe('PostWriter', () => {
  it('adds new tags', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createLocalVue(),
      propsData: {
        post: {
          ...article,
          tags: []
        }
      }
    })

    wrapper.find('#new-tag').setValue('New tag')
    wrapper.find('#new-tag').trigger('keyup.enter')
    wrapper.find('#new-tag').setValue('New tag 2')
    wrapper.find('#new-tag').trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.tag')).toHaveLength(2)
    expect(wrapper.find('.tag').text()).toBe('New tag')
  })

  it('removes a tag', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createLocalVue(),
      propsData: {
        post: {
          ...article,
          tags: ['tag 1']
        }
      }
    })
    expect(wrapper.findAll('.tag')).toHaveLength(1)

    wrapper.find('[data-test-remove-tag]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.tag')).toHaveLength(0)
  })

  it('hides the markdown preview', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createLocalVue(),
      propsData: {
        post: {
          ...article,
        }
      }
    })
    expect(wrapper.find('#rendered-markdown').isVisible()).toBe(true)

    wrapper.find('[data-test-preview]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('#rendered-markdown').isVisible()).toBe(false)
  })
  
  it('updates markdown', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createLocalVue(),
      propsData: {
        post: {
          ...article,
        }
      }
    })

    wrapper.find('#markdown').element.innerText = '# Some Markdown'
    wrapper.find('#markdown').trigger('input')

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#rendered-markdown').element.innerHTML
    ).toBe('<h1 id="some-markdown">Some Markdown</h1>\n')
  })
})