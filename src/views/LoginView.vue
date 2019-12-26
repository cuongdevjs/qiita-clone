<template>
  <div>
    <Login @login="handleSubmit" />
  </div>  
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import Login from '@/components/Login/Login.vue'
import { LoginUser } from '@/components/Login/types'
import { useUsers } from '@/store/users/'

export default createComponent({
  name: 'LoginView',

  components: {
    Login,
  },

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)

    const handleSubmit = async (payload: LoginUser) => {
      await users.actions.login(payload)
      ctx.root.$router.push('/')
    }

    return {
      handleSubmit,
    }
  }
})
</script>

<style>
</style>