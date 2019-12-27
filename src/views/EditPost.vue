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
import { Post } from '../types'
import { usePosts } from '@/store/posts'
import moment from 'moment'

export default createComponent({
  name: 'EditPost',

  components: {
    PostWriter,
  },

  setup(props, { root }) {
    const posts = usePosts(root.$store)
    const id = root.$route.params.id
    const post = ref<Post | undefined>()

    if (!posts.state.all[id]) {
      posts.actions.fetchById(root.$route.params.id)
    }

    watch(() => posts.state.all[root.$route.params.id], thePost => {
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