import { createComponent, computed } from '@vue/composition-api'

import { useArticles } from '@/store/articles'
import { useUsers } from '@/store/users'
import { IArticle, IUser } from '@/types'


export default createComponent({
  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    const users = useUsers(ctx.root.$store)
    articles.actions.fetchAll()

    return {
      articles: computed(() => articles.getters.articles),
      loading: computed(() => articles.state.loading || !articles.state.touched),
      getUser: (article: IArticle): IUser => users.getters.getById(article.authorId)
    }
  },
})