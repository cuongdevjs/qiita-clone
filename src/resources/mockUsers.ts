import { User } from '@/types'

const mockUsers: User[] = [
  {
    id: 1,
    username: 'Lachlan',
    following: true,
    profile: 'Full stack developer with an interest in Vue and TypeScript',
    isCurrentUser: true,
  },
  {
    id: 2,
    username: 'Lily',
    following: false,
    profile: 'Designer with passion for typography and nature',
    isCurrentUser: false,
  }
]

export {
  mockUsers,
}