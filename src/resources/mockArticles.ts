import random from 'lodash/random'
import moment from 'moment'

import data from './article.txt'
import markdown from './article-plain.txt'

import { IArticle } from '@/types'

const mockArticles: IArticle[] = [
  {
    id: 1,
    title: 'Hacking with Vue and TypeScript',
    content: data,
    markdown,
    created: moment(),
    likes: random(0, 100),
    authorId: 1,
  },
  {
    id: 2,
    title: 'I created the exact same app in React and Vue. Here are the differences',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 3,
    title: 'Vue.js 2 Quickstart Tutorial 2017',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 5,
    title: 'Vue.js 2 Quickstart Tutorial 2017',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 6,
    title: '10 Things You Will Eventually Learn About JavaScript Projects',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 7,
    title: 'Vue.js: the good, the meh, and the ugly',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 8,
    title: 'Vue 2 + Firebase: How to build a Vue app with Firebase authentication system in 15 minutes',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 9,
    title: 'The Vue Handbook: a thorough introduction to Vue.js',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
  {
    id: 10,
    title: 'What’s new in Vue Devtools 4.0',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
  },
]

export {
  mockArticles
}