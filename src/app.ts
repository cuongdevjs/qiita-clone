import { createComponent } from '@vue/composition-api'

import TopNav from '@/components/TopNav/TopNav.vue'
import Timeline from '@/components/Timeline/Timeline.vue'

export default createComponent({
  components: {
    TopNav,
    Timeline,
  },
})