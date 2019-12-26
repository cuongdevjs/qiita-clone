<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <h4 class="title is-4">Vue Composition API Demo</h4>
      </RouterLink>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink 
              v-if="authenticated"
              class="button"
              to="/posts/new"
            >
              New Post
            </RouterLink>

            <RouterLink 
              v-if="!authenticated"
              class="button is-primary" 
              to="/users/new"
            >
              <strong>Sign up</strong>
            </RouterLink>

            <RouterLink
              v-if="!authenticated"
              class="button is-light"
              to="/users/login"
            >
              Log in
            </RouterLink>

            <Profile 
              v-if="authenticated" 
              @logout="handleLogout"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts"> 
import { createComponent, computed } from '@vue/composition-api'

import { useUsers } from '@/store/users'
import Profile from './Profile.vue'

export default createComponent({
  components: {
    Profile,
  },

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)

    const handleLogout = async () => {
      await users.actions.logout()

      if (ctx.root.$route.path !== '/') {
        ctx.root.$router.push('/')
      }
    }

    return {
      authenticated: computed(() => users.state.authenticated),
      handleLogout,
    }
  },
})
</script>

<style scoped>
</style>