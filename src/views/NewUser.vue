<template>
  <SignUp @signup="handleSubmit" />
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

import SignUp from '@/components/SignUp/SignUp.vue'
import { NewUser } from '../components/SignUp/types'

export default createComponent({
  name: 'NewUser',

  components: {
    SignUp,
  },

  setup(props, ctx) {
    const handleSubmit = (user: NewUser) => {
      console.log(user)
      // ctx.root.$emit('signup', user)
    }

    return {
      handleSubmit,
    }
  }
})
</script>

<style>
</style>