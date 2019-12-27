<template>
  <PostWriter 
    :post="newPost" 
    @submitted="handleCreate"
  />
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { Post } from '../types'
import { usePosts } from '@/store/posts'
import moment from 'moment'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter,
  },

  setup(props, ctx) {
    const newPost: Post = {
      id: 0,
      title: '',
      content: '',
      tags: [],
      markdown: '',
      created: moment(),
      authorId: 0,
      likes: 0,
    }

    const posts = usePosts(ctx.root.$store)

    const handleCreate = async (post: Post) => {
      await posts.actions.createPost(post)
      ctx.root.$router.push('/')
    }

    return {
      newPost,
      handleCreate,
    }
  }
})
</script>