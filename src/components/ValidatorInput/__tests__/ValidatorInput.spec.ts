
import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import ValidatorInput from '../ValidatorInput.vue'
import { Rule, minLength } from '../validation'

const rule: Rule = minLength({ min: 5, max: 20 })

const propsData = {
  name: 'input',
  label: 'Input',
  value: '',
  type: 'text',
  validation: [rule]
}

describe('ValidatorInput', () => {
  it('renders a label if one is present', () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createLocalVue(),
      propsData,
    })
    expect(wrapper.find('label').text()).toBe('Input')
  })

  it('renders a label if not present', () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createLocalVue(),
      propsData: { ...propsData, label: undefined },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders success class when input is valid', async (done) => {
    const wrapper = mount(ValidatorInput, {
      localVue: createLocalVue(),
      propsData: {
        ...propsData,
        value: 'valid input'
      }
    })

    wrapper.find('input').trigger('keyup')
    wrapper.find('input').trigger('input')
    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('[data-success]').exists()).toBe(true)
      done()
    }, 750)
  })

  it('renders error when input is invalid', async (done) => {
    const wrapper = mount(ValidatorInput, {
      localVue: createLocalVue(),
      propsData: {
        ...propsData,
        value: '123'
      }
    })

    wrapper.find('input').trigger('keyup')
    wrapper.find('input').trigger('input')
    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('[data-error]').exists()).toBe(true)
      expect(wrapper.find('[data-error]').text()).toBe('Value must be between 5 and 20')
      done()
    }, 750)
  })
})