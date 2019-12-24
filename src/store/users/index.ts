import { Store } from 'vuex'
import { Mutations, Module, createMapper, Actions, Getters } from 'vuex-smart-module'

import { IUser, IHashMap } from '@/types'
import { mockUsers } from '@/resources/mockUsers'


class UsersState {
  ids: number[] = [1, 2]
  all: IHashMap<IUser> = {
    1: mockUsers[0],
    2: mockUsers[1],
  }
  loading = false
  touched = true
}

class UserGetters extends Getters<UsersState> {
  getById(id: number) {
    return this.state.all[id]
  }
}


const users = new Module({
  state: UsersState,
  getters: UserGetters,
})

const usersMapper = createMapper(users)

const useUsers = ($store: Store<undefined>) => {
  return users.context($store)
}

export {
  useUsers,
  users,
}
