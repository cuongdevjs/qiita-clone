import { IUser } from '@/types'

const mockUsers: IUser[] = [
  {
    id: 1,
    username: 'Lachlan',
    following: true,
    profile: 'Full stack developer with an interest in Vue and TypeScript'
  },
  {
    id: 2,
    username: 'Lily',
    following: false,
    profile: 'Designer with passion for typography and nature'
  }
]

export {
  mockUsers,
}