<template>
  <a class="panel-block">
    <div class="level">
      <div>
        <div>
          <RouterLink
            :to="linkTo(post.id)"
            class="link"
          >
            {{ post.title }}
          </RouterLink>
        </div>
        <div class="has-text-grey-light">
          By 
          <RouterLink to='#' class="link">
            {{ getUser(post).username }}
          </RouterLink> 
          {{ post.created.fromNow() }} 

          <span @click="() => handleLike(post)">
            <i class="far fa-thumbs-up" />
            {{ post.likes }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive } from '@vue/composition-api'

import { Post, User } from '@/types'
import { useUsers } from '@/store/users'
import { usePosts } from '@/store/posts'

export default createComponent({
  name: 'TimelineItem',

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)

    const linkTo = (id: number) => `/posts/${id}`
    const handleLike = (post: Post) => ctx.emit('like', post)

    return {
      linkTo,
      getUser: (post: Post): User => users.getters.getById(post.authorId),
      handleLike,
    }
  },
})
</script>