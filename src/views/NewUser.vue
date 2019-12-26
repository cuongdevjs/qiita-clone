<template>
  <div>
    <SignUp @signup="handleSubmit">
      <template v-slot:buttons>
        <div class="control">
          <button type="submit" class="button is-primary">Submit</button>
        </div>
      </template>
    </SignUp>
  </div>  
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