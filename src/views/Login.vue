<template>
  <div>
    <LoginForm @login="handleSubmit" />
  </div>  
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import LoginForm from '@/components/LoginForm/LoginForm.vue'
import { LoginUser } from '@/components/LoginForm/types'
import { useUsers } from '@/store/users/'

export default createComponent({
  name: 'Login',

  components: {
    LoginForm,
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