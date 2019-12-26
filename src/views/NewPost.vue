<template>
  <PostWriter :post="newPost" />
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { IArticle } from '../types'
import moment from 'moment'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter,
  },

  setup() {
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

    return {
      newPost,
    }
  }
})
</script>