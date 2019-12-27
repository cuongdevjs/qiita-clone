<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        v-model="username"
        @validate="handleValidate"
        name="username"
        type="text"
        label="Username"
        :validation="usernameValidation"
        placeholder="Username"
      />

      <ValidatorInput 
        v-model="email"
        type="text"
        @validate="handleValidate"
        name="email"
        label="Email"
        :validation="emailValidation"
        placeholder="Email"
      />

      <ValidatorInput 
        v-model="password"
        type="password"
        @validate="handleValidate"
        name="password"
        label="Password"
        :validation="usernameValidation"
        placeholder="Password"
      />

      <div class="field is-grouped is-grouped-right">
        <button 
          :disabled="!formValid"
          type="submit" 
          class="button is-primary"
        >
          Submit
        </button>
      </div>
    </form>
  </section>  
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref, reactive, computed } from '@vue/composition-api'

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
    const formValidity = reactive({
      username: false,
      email: false,
      password: false,
    })

    const usernameValidation: Rule[] = [
      minLength({ min: 5, max: 20 })
    ]

    const emailValidation: Rule[] = [
      format(new RegExp(/\w{2,}.*@\w{3,}.*\.\w{2,}/))
    ]

    const formValid = computed(() => 
      formValidity.username && formValidity.password && formValidity.email)

    const handleValidate = (
      name: 'username' | 'password' | 'email',
      valid: boolean
    ) => {
      formValidity[name] = valid
    }

    const handleSubmit = () => {
      if (!formValid) {
        return
      }

      const newUser: NewUser = {
        username: username.value,
        password: password.value,
        email: email.value,
      }
      ctx.emit('signup', newUser)
    }

    return {
      username: username.value,    
      password: password.value,    
      email: email.value,
      usernameValidation,
      emailValidation,
      passwordValidation: usernameValidation,
      formValid,
      handleSubmit,
      handleValidate,
    }
  }
})
</script>