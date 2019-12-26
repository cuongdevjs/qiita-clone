import moment from 'moment'

import { IArticle } from '@/types'

const article: IArticle = {
  id: 1,
  title: 'Today',
  content: '',
  created: moment(),
  likes: 1,
  authorId: 1,
}

export {
  article
}