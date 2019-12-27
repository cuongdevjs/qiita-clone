import { Store } from 'vuex'
import { Module, Getters, Actions, Mutations } from 'vuex-smart-module'

import { User, HashMap } from '@/types'
import { LoginUser } from '@/components/LoginForm/types'
import { mockUsers } from '@/resources/mockUsers'
import { delay } from '../utils'
import { axios } from '@/resources/mockAxios'


class UsersState {
  ids: number[] = [1, 2]
  all: HashMap<User> = {
    1: mockUsers[0],
    2: mockUsers[1],
  }
  loading = false
  touched = true
  authenticated = true
}

class UserGetters extends Getters<UsersState> {
  getById(id: number) {
    return this.state.all[id]
  }

  currentUser() {
    if (!this.state.authenticated) {
      return
    }
    const id = this.state.ids.find(x => this.state.all[x].isCurrentUser)!
    return this.state.all[id]
  }
}

class UsersMutations extends Mutations<UsersState> {
  LOGOUT_CURRENT_USER(payload: User) {
    this.state.authenticated = false
    this.state.all[payload.id] = {
      ...this.state.all[payload.id],
      isCurrentUser: false,
    }
  }

  SET_CURRENT_USER(payload: User) {
    this.state.authenticated = true
    this.state.all[payload.id] = {
      ...this.state.all[payload.id],
      isCurrentUser: true,
    }
  }
}

class UsersActions extends Actions<
  UsersState,
  UserGetters,
  UsersMutations,
  UsersActions
> {
  async logout(): Promise<void> {
    const user = this.getters.currentUser()
    if (!user) {
      return
    }

    await delay()
    await axios.post('/users/logout', user)
    this.commit('LOGOUT_CURRENT_USER', user)
  }

  async login(user: LoginUser): Promise<void> {
    await delay()
    await axios.post('/users/login', user)
    this.commit('SET_CURRENT_USER', mockUsers[0])
  }

  async signup(user: User): Promise<void> {
    await delay()
    await axios.post('/users/signup', user)
    this.commit('SET_CURRENT_USER', mockUsers[0])
  }
}

const users = new Module({
  state: UsersState,
  getters: UserGetters,
  actions: UsersActions,
  mutations: UsersMutations,
})

const useUsers = ($store: Store<undefined>) => {
  return users.context($store)
}

export {
  useUsers,
  users,
}
