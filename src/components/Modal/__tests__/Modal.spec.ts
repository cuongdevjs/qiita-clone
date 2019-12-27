import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import Modal from '../Modal.vue'

describe('Modal', () => {
  it('emits hide when background is clicked', () => {
    const wrapper = mount(Modal, {
      localVue: createLocalVue()
    })

    wrapper.find('.modal-background').trigger('click')

    expect(wrapper.emitted().hide).toHaveLength(1)
  })
})