<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Posts
    </p>

    <div 
      v-if="loading"
      class="panel-block"
    >
      Loading...
    </div>

    <span v-else>
      <p class="panel-tabs">
        <a
          v-for="tab in tabs"
          :key="tab"
          :class="[ tab === currentPeriod ? 'is-active' : '']"
          @click="() => setActiveTab(tab)"
        >
          {{ tab }}
        </a>
      </p>
      <TimelineItem
        v-for="article in articles" 
        :key="article.id"
        :article="article"
        @like="handleLike"
      />
    </span>

    <Portal to="modal">
      <Modal
        v-show="showShareModal"
        @hide="showShareModal = false"
      >
        <SignUp @signup="handleSignup">
          <template v-slot:buttons>
            <div class="control">
              <button 
                type="button" 
                class="button is-link is-light"
                @click="showShareModal = false"
              >
                Cancel
              </button>
            </div>
            <div class="control">
              <button 
                type="submit" 
                class="button is-primary"
              >
                Submit
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
import Modal from '@/components/Modal/index.vue'
import { NewUser } from '../SignUp/types'
import TimelineItem from '@/components/TimelineItem.vue'
import { useArticles } from '@/store/articles'
import { IArticle } from '../../types'
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
    const articles = useArticles(ctx.root.$store)
    const tabs = ref<Period>(['Today', 'This Week', 'This Month'])
    const currentPeriod = ref<Period>('Today')

    articles.actions.fetchAll()

    const showShareModal = ref(false)

    const setActiveTab = (period: Period) => {
      currentPeriod.value = period
    }

    const handleLike = (article: IArticle) => {
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
        articles.getters.articles)
    })

    return {
      articles: display,
      loading: computed(() => articles.state.loading || !articles.state.touched),
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