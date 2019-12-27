<template>
  <PostWriter 
    :post="newPost" 
    @submitted="handleCreate"
  />
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { IArticle } from '../types'
import { useArticles } from '@/store/articles'
import moment from 'moment'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter,
  },

  setup(props, ctx) {
    const newPost: IArticle = {
      id: 0,
      title: '',
      content: '',
      tags: [],
      markdown: '',
      created: moment(),
      authorId: 0,
      likes: 0,
    }

    const articles = useArticles(ctx.root.$store)

    const handleCreate = async (post: IArticle) => {
      await articles.actions.createPost(post)
      ctx.root.$router.push('/')
    }

    return {
      newPost,
      handleCreate,
    }
  }
})
</script>