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
        <a class="is-active">Today</a>
        <a>This Week</a>
        <a>This Month</a>
      </p>
      <a 
        v-for="article in articles" 
        :key="article.id"
        class="panel-block"
      >
        <div class="level">
          <div>
            <div>
              <RouterLink
                :to="linkTo(article.id)"
                class="link"
              >
                {{ article.title }}
              </RouterLink>
            </div>
            <div class="has-text-grey-light">
              By 
              <RouterLink to='#' class="link">
                {{ getUser(article).username }}
              </RouterLink> 
              {{ article.created.fromNow() }} 

              <span @click="() => toggleShareModal(true)">
                <i class="far fa-thumbs-up" />
                {{ article.likes }}
              </span>
            </div>
          </div>
        </div>
      </a>
    </span>

    <Portal to="modal">
      <Modal
        v-show="showShareModal"
        @hide="() => toggleShareModal(false)"
      >
        <SignUp />
      </Modal>
    </Portal>

  </nav>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'

import SignUp from '@/components/SignUp.vue'
import Modal from '@/components/Modal/index.vue'
import { useArticles } from '@/store/articles'
import { useUsers } from '@/store/users'
import { IArticle, IUser } from '@/types'


export default createComponent({
  components: {
    SignUp,
    Modal,
  },

  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    const users = useUsers(ctx.root.$store)
    const linkTo = (id: number) => `/posts/${id}`
    articles.actions.fetchAll()

    const showShareModal = ref(false)
    const toggleShareModal = (value: boolean) => {
      showShareModal.value = value
    }

    return {
      articles: computed(() => articles.getters.articles),
      loading: computed(() => articles.state.loading || !articles.state.touched),
      linkTo,
      showShareModal,
      toggleShareModal,
      getUser: (article: IArticle): IUser => users.getters.getById(article.authorId)
    }
  },
})
</script>

<style scoped>
a.link:hover {
  text-decoration: underline;
}
</style>