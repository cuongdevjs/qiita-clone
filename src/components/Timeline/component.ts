import { createComponent, computed } from '@vue/composition-api'

import { useArticles } from '@/store/articles'


export default createComponent({
  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    articles.actions.fetchAll()

    return {
      articles: computed(() => articles.state.ids.map(x => articles.state.all[x])),
      loading: computed(() => articles.state.loading || !articles.state.touched)
    }
  },
})