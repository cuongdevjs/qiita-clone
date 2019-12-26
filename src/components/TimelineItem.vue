<template>
  <a class="panel-block">
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

          <span @click="() => handleLike(article)">
            <i class="far fa-thumbs-up" />
            {{ article.likes }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent, computed, ref, reactive } from '@vue/composition-api'

import { IArticle, IUser } from '@/types'
import { useUsers } from '@/store/users'
import { useArticles } from '@/store/articles'

export default createComponent({
  name: 'TimelineItem',

  props: {
    article: {
      type: Object as () => IArticle,
      required: true,
    }
  },

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)

    const linkTo = (id: number) => `/posts/${id}`
    const handleLike = (article: IArticle) => ctx.emit('like', article)

    return {
      linkTo,
      getUser: (article: IArticle): IUser => users.getters.getById(article.authorId),
      handleLike,
    }
  },
})
</script>