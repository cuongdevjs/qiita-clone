<template>
  <PostWriter 
    v-if="post"
    :post="post" 
  />
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { IArticle } from '../types'
import { useArticles } from '@/store/articles'
import moment from 'moment'

export default createComponent({
  name: 'EditPost',

  components: {
    PostWriter,
  },

  setup(props, { root }) {
    const articles = useArticles(root.$store)
    const id = root.$route.params.id
    const post = ref<IArticle | undefined>()

    if (!articles.state.all[id]) {
      articles.actions.fetchById(root.$route.params.id)
    }

    watch(() => articles.state.all[root.$route.params.id], thePost => {
      if (thePost) {
        post.value = thePost
      }
    })


    return {
      post,
    }
  }
})
</script>