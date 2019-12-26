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
          :key="tab.title"
          :class="[ tab.active ? 'is-active' : '']"
          @click="() => setActiveTab(tab)"
        >
          {{ tab.title }}
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
        @hide="() => toggleShareModal(false)"
      >
        <SignUp @cancel="() => toggleShareModal(false)" />
      </Modal>
    </Portal>


  </nav>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive } from '@vue/composition-api'

import SignUp from '@/components/SignUp.vue'
import Modal from '@/components/Modal/index.vue'
import TimelineItem from '@/components/TimelineItem.vue'
import { useArticles } from '@/store/articles'
import { IArticle } from '../../types'

interface ITab {
  title: 'Today' | 'This Week' | 'This Month'
  active: boolean
}

export default createComponent({
  components: {
    Modal,
    SignUp,
    TimelineItem,
  },

  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    const tabs = ref<ITab[]>([
      { title: 'Today', active: true },
      { title: 'This Week', active: false },
      { title: 'This Month', active: false },
    ])

    articles.actions.fetchAll()

    const showShareModal = ref(false)
    const toggleShareModal = (value: boolean) => {
      showShareModal.value = value
    }

    const setActiveTab = (targetTab: ITab) => {
      tabs.value = tabs.value.map(tab => {
        return tab.title === targetTab.title
          ? { ...tab, active: true }
          : { ...tab, active: false }
      })
    }

    const handleLike = (article: IArticle) => {
      if (!1) {
        return
      }

      toggleShareModal(true)
    }

    return {
      articles: computed(() => articles.getters.articles),
      loading: computed(() => articles.state.loading || !articles.state.touched),
      tabs,
      handleLike,
      setActiveTab,
      showShareModal,
      toggleShareModal,
    }
  },
})
</script>

<style scoped>
a.link:hover {
  text-decoration: underline;
}
</style>