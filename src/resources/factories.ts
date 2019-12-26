import moment from 'moment'

import { IArticle } from '@/types'

const article: IArticle = {
  id: 1,
  title: 'Today',
  markdown: '',
  content: '',
  created: moment(),
  likes: 1,
  authorId: 1,
  tags: ['vuejs', 'web development', '2020']
}

export {
  article
}