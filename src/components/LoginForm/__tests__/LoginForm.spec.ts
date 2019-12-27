import { mount } from '@vue/test-utils'

import ValidatorInput from '@/components/ValidatorInput/ValidatorInput.vue'
import { createLocalVue } from '@/components/testHelper'
import LoginForm from '../LoginForm.vue'
import { LoginUser } from '../types'

describe('LoginForm', () => {
  it('emits event with username/password when submitted', () => {
    const expected: LoginUser = {
      username: 'username',
      password: 'password',
    }
    const wrapper = mount(LoginForm, {
      localVue: createLocalVue()
    })


    wrapper.find('[data-test-username]').find('input').setValue('username')
    wrapper.findAll(ValidatorInput).at(1).find('input').setValue('password')
    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted().login[0][0]).toEqual(expected)
  })
})