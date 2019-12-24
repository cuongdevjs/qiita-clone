import { Moment } from 'moment'

export interface IHashMap<T> {
  [key: string]: T
}

export interface IArticle {
  id: number
  title: string
  content: string
  created: Moment
  authorId: number
  likes: number

}

export interface IUser {
  id: number
  username: string
  profile: string
  following: boolean
}