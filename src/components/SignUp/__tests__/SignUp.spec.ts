import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import SignUp from '../SignUp.vue'

describe('SignUp', () => {
  it('emits hide when background is clicked', () => {
    const wrapper = mount(SignUp, {
      localVue: createLocalVue()
    })

    wrapper.find('.modal-background').trigger('click')

    expect(wrapper.emitted().hide).toHaveLength(1)
  })
})