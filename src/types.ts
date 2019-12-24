import { Moment } from 'moment'

export interface IHashMap<T> {
  [id: number]: T
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