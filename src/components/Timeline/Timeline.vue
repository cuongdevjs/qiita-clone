<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Posts
    </p>

    <div 
      v-if="loading"
      data-test-loading
      class="panel-block"
    >
      Loading...
    </div>

    <span v-else>
      <p class="panel-tabs">
        <a
          v-for="tab in tabs"
          :key="tab"
          :data-test-tab="tab"
          :class="[ tab === currentPeriod ? 'is-active' : '']"
          @click="() => setActiveTab(tab)"
        >
          {{ tab }}
        </a>
      </p>
      <TimelineItem
        v-for="post in posts" 
        :key="post.id"
        :post="post"
        @like="handleLike"
      />
    </span>

    <Portal to="modal">
      <Modal
        v-if="showShareModal"
        @hide="showShareModal = false"
      >
        <SignUp @signup="handleSignup">
          <template v-slot:extraButtons>
            <div class="control">
              <button 
                type="button" 
                class="button is-link is-light"
                @click="showShareModal = false"
              >
                Cancel
              </button>
            </div>
          </template> 
        </SignUp>

      </Modal>
    </Portal>
  </nav>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive, toRefs } from '@vue/composition-api'

import SignUp from '@/components/SignUp/SignUp.vue'
import Modal from '@/components/Modal/Modal.vue'
import { NewUser } from '../SignUp/types'
import TimelineItem from './TimelineItem.vue'
import { usePosts } from '@/store/posts'
import { Post } from '../../types'
import { Period } from './types'
import { filterByPeriod } from './filters'

export default createComponent({
  components: {
    Modal,
    SignUp,
    TimelineItem,
  },

  props: {},

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    const tabs = ref<Period>(['Today', 'This Week', 'This Month'])
    const currentPeriod = ref<Period>('Today')

    if (!posts.state.touched) {
      posts.actions.fetchAll()
    }

    const showShareModal = ref(false)

    const setActiveTab = (period: Period) => {
      currentPeriod.value = period
    }

    const handleLike = (post: Post) => {
      if (!1) {
        return
      }

      showShareModal.value = true
    }

    const handleSignup = (newUser: NewUser) => {
      console.log('newUser', newUser)
    }

    const display = computed(() => { 
      return filterByPeriod(
        currentPeriod.value,
        posts.getters.posts)
    })

    const loading = computed(() => posts.state.loading || !posts.state.touched)

    return {
      posts: display,
      loading,
      tabs,
      currentPeriod,
      handleSignup,
      handleLike,
      setActiveTab,
      showShareModal,
    }
  },
})
</script>

<style scoped>
a.link:hover {
  text-decoration: underline;
}
</style>