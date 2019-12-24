import { createComponent, computed, ref } from '@vue/composition-api'

import Modal from '@/components/Modal/index.vue'
import { useArticles } from '@/store/articles'
import { useUsers } from '@/store/users'
import { IArticle, IUser } from '@/types'


export default createComponent({
  components: {
    Modal,
  },

  setup(props, ctx) {
    const articles = useArticles(ctx.root.$store)
    const users = useUsers(ctx.root.$store)
    articles.actions.fetchAll()

    const showShareModal = ref(false)
    const toggleShareModal = (value: boolean) => {
      showShareModal.value = value
    }

    return {
      articles: computed(() => articles.getters.articles),
      loading: computed(() => articles.state.loading || !articles.state.touched),
      showShareModal,
      toggleShareModal,
      getUser: (article: IArticle): IUser => users.getters.getById(article.authorId)
    }
  },
})