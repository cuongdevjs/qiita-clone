<template>
  <div class="columns">
    <div class="column">
      <!-- placeholder -->
    </div>

    <div class="column is-two-thirds">
      <div v-if="article">
        <h1 class="title">
          {{ article.title }}
        </h1>

        <div class="post-html" v-html="article.content" />
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
import { IArticle } from '../types'

export default createComponent({
  name: 'Posts',

  props: {},

  setup(props, { root }) {
    const articles = useArticles(root.$store)
    let article = ref<IArticle | undefined>(undefined)

    watch(() => root.$route.params.id, async (id: string) => {
      console.log('oid', id)
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
    })

    return {
      article
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