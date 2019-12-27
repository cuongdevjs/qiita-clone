import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

const create = () => {
  const localVue = createLocalVue()
  localVue.component('RouterLink', {
    name: 'RouterLink',
    render: h => h('div'),
  })
  localVue.use(CompositionApi)
  return localVue
}

export {
  create as createLocalVue
}
