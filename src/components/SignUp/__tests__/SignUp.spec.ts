import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import SignUp from '../SignUp.vue'
import { NewUser } from '../types'

describe('SignUp', () => {
  it('can be submitted when all fields are valid', async (done) => {
    const wrapper = mount(SignUp, {
      localVue: createLocalVue()
    })
    const newUser: NewUser = {
      username: 'username',
      password: 'password',
      email: 'email@email.com',
    }
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled')

    const username = wrapper.find('[name="username"]').find('input')
    username.setValue('username')
    username.trigger('keyup')

    const password = wrapper.find('[name="password"]').find('input')
    password.setValue('password')
    password.trigger('keyup')

    const email = wrapper.find('[name="email"]').find('input')
    email.setValue('email@email.com')
    email.trigger('keyup')

    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('button').attributes('disabled')).toBe(undefined)
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.emitted().signup[0][0]).toEqual(newUser)
      done()
    }, 750)
  })
})