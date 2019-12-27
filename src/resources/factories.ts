import moment from 'moment'

import { Post } from '@/types'

const post: Post = {
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
  post
}