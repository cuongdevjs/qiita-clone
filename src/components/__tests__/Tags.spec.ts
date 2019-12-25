import CompositionApi from '@vue/composition-api'
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(CompositionApi)

import Tags from '../Tags.vue'

describe('Tags', () => {
  it('creates new tags', async () => {
    const wrapper = mount(Tags, { localVue })

    wrapper.find('#new-tag').setValue('New tag')
    wrapper.find('#new-tag').trigger('keyup.enter')
    wrapper.find('#new-tag').setValue('New tag 2')
    wrapper.find('#new-tag').trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.tag')).toHaveLength(2)
    expect(wrapper.find('.tag').text()).toBe('New tag')
  })

  it('deletes a tag', async () => {
    const wrapper = mount(Tags, { localVue })

    wrapper.find('#new-tag').setValue('New tag')
    wrapper.find('#new-tag').trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    wrapper.find('.delete').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.tag')).toHaveLength(0)
  })
})