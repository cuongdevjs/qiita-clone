<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        v-model="username"
        type="text"
        label="Username"
        :validation="usernameValidation"
        placeholder="Username"
      />

      <ValidatorInput 
        v-model="email"
        type="text"
        label="Email"
        :validation="emailValidation"
        placeholder="Email"
      />

      <ValidatorInput 
        v-model="password"
        type="password"
        label="Password"
        :validation="usernameValidation"
        placeholder="Password"
      />

      <div class="field is-grouped is-grouped-right">
        <slot name="buttons" />
      </div>
    </form>
  </section>  
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref } from '@vue/composition-api'

import { NewUser } from '@/components/SignUp/types'
import { minLength, Rule, format } from '@/components/ValidatorInput/validation'
import ValidatorInput from '@/components/ValidatorInput/ValidatorInput.vue'

export default createComponent({
  name: 'SignUp',

  props: {},

  components: {
    ValidatorInput,
  },

  setup(props, ctx) {
    const username = ref('')
    const password = ref('')
    const email = ref('')

    const usernameValidation: Rule[] = [
      minLength({ min: 5, max: 20 })
    ]

    const emailValidation: Rule[] = [
      format(new RegExp(/\w{2,}.*@\w{3,}.*\.\w{2,}/))
    ]

    const handleSubmit = () => {
      const newUser: NewUser = {
        username: username.value,
        password: password.value,
        email: email.value,
      }
      ctx.emit('signup', newUser)
    }

    return {
      username: username.value,    
      usernameValidation,
      emailValidation,
      passwordValidation: usernameValidation,
      password: password.value,    
      email: email.value,
      handleSubmit,
    }
  }
})
</script>