<template>
  <div class="columns">
    <div class="column">
      <!-- placeholder -->
    </div>

    <div class="column is-two-thirds">
      <div v-if="article">
        <div class="columns">
          <div class="column">
            <div class="is-pulled-right">
              <div class="buttons">
                <RouterLink 
                  v-if="canEdit"
                  :to="editLink"
                  class="button is-rounded is-link"
                >
                  <i class="fas fa-edit" />
                </RouterLink>

                <div class="button is-rounded is-success">
                  <i class="fas fa-share" />
                </div>

                <div class="button is-rounded is-info">
                  <i class="far fa-thumbs-up" />
                </div>
              </div> 
            </div>
          </div>
        </div>
        <h1 class="title">
          {{ article.title }}
        </h1>

        <div class="post-html" v-html="article.markdown" />
      </div>

      <div v-else>
        Loading...
      </div>
    </div>

    <div class="column">
      <!-- placeholder -->
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, watch, reactive, ref } from '@vue/composition-api'

import { useArticles } from '@/store/articles'
import { useUsers } from '@/store/users'
import { IArticle } from '../types'

export default createComponent({
  name: 'Posts',

  props: {},

  setup(props, { root }) {
    const articles = useArticles(root.$store)
    const users = useUsers(root.$store)
    const editLink = ref('')
    let article = ref<IArticle | undefined>(undefined)
    let canEdit = ref(false)

    watch(() => root.$route.params.id, async (id: string) => {
      if (!id) {
        return
      }

      if (!articles.state.touched) {
        await articles.actions.fetchById(id)
      }

      if (!articles.state.ids.includes(parseInt(id, 10))) {
        // 404
      }

      article.value = articles.state.all[id]
      const currentUser = users.getters.currentUser()
      canEdit.value = !!(users.state.authenticated && currentUser && currentUser.id === articles.state.all[id].authorId)
      editLink.value = `/posts/${id}/edit`
    })


    return {
      article,
      canEdit,
      editLink,
    }
  },
  
  components: {
    // Posts
  }
})
</script>


<style lang="scss">
@import '../components/markdown-style.scss';
</style>