<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        v-model="username"
        type="text"
        label="Username"
        placeholder="Username"
        data-test-username
      />

      <ValidatorInput 
        data-test-password
        v-model="password"
        type="password"
        label="Password"
        placeholder="Password"
      />

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button 
            type="submit" 
            class="button is-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </section>  
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref } from '@vue/composition-api'

import { LoginUser } from './types'
import { minLength, Rule, format } from '@/components/ValidatorInput/validation'
import ValidatorInput from '@/components/ValidatorInput/ValidatorInput.vue'

export default createComponent({
  name: 'LoginForm',

  components: {
    ValidatorInput,
  },

  setup(props, ctx) {
    const username = ref('')
    const password = ref('')

    const handleSubmit = () => {
      const loginUser: LoginUser = {
        username: username.value,
        password: password.value
      }
      ctx.emit('login', loginUser)
    }

    return {
      username,
      password,
      handleSubmit,
    }
  }
})
</script>