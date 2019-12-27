import { mount } from '@vue/test-utils'

import { createLocalVue } from '@/components/testHelper'
import TopNav from '../TopNav.vue'
import Profile from '../Profile.vue'

let mockAuthenticated = true
let mockLogout = jest.fn()

jest.mock('@/store/users', () => ({
  useUsers: () => ({
    state: {
      authenticated: mockAuthenticated,
    },
    getters: {
      getById: () => 'Username'
    },
    actions: {
      logout: mockLogout
    }
  })
}))

describe('TopNav', () => {
  it('shows New Post and Profile when logged in', () => {
    mockAuthenticated = true
    const wrapper = mount(TopNav, {
      localVue: createLocalVue()
    })

    expect(wrapper.find('[data-test-new-post]').exists()).toBe(true)
    expect(wrapper.find(Profile).exists()).toBe(true)
    expect(wrapper.find('[data-test-sign-up]').exists()).toBe(false)
    expect(wrapper.find('[data-test-log-in]').exists()).toBe(false)
  })

  it('shows Sign Up and Sign In when not logged in', () => {
    mockAuthenticated = false
    const wrapper = mount(TopNav, {
      localVue: createLocalVue()
    })

    expect(wrapper.find('[data-test-sign-up]').exists()).toBe(true)
    expect(wrapper.find('[data-test-log-in]').exists()).toBe(true)
    expect(wrapper.find('[data-test-new-post]').exists()).toBe(false)
    expect(wrapper.find(Profile).exists()).toBe(false)
  })

  it('renders profile when clicked', async () => {
    mockAuthenticated = true
    const wrapper = mount(TopNav, {
      localVue: createLocalVue(),
      mocks: {
        $route: { path: '' },
        $router: { push: () => {} }
      }
    })

    wrapper.find('#profile-control').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.find(Profile).find('[data-test-logout]').trigger('click')

    expect(mockLogout).toHaveBeenCalled()
  })
})