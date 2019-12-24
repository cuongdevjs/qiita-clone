import { createComponent } from '@vue/composition-api'

import TopNav from '@/components/TopNav/index.vue'
import Timeline from '@/components/Timeline/index.vue'

export default createComponent({
  components: {
    TopNav,
    Timeline,
  },
})