import { createComponent, computed } from '@vue/composition-api'

import { useArticles } from './store/articles'
import { IArticle } from './types'

export default createComponent({
  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    articles.actions.fetchAll()

    // watch(() => articles.state.all[1], (val, oldVal) => {
    //   console.log(oldVal)
    //   console.log(val)
    // })

    return {
      articles: computed(() => articles.state.ids.map(x => articles.state.all[x]))
    }
  },
})