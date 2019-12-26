import { Moment } from 'moment'

export interface IHashMap<T> {
  [key: string]: T
}

export interface IArticle {
  id: number
  title: string
  content: string
  markdown: string
  created: Moment
  authorId: number
  likes: number
  tags: string[]

}

export interface IUser {
  id: number
  username: string
  profile: string
  following: boolean
  isCurrentUser: boolean
}