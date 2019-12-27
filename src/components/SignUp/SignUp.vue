<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        v-model="username"
        name="username"
        type="text"
        label="Username"
        placeholder="Username"
        :validation="usernameValidation"
        @validate="handleValidate"
      />

      <ValidatorInput 
        v-model="email"
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
        :validation="emailValidation"
        @validate="handleValidate"
      />

      <ValidatorInput 
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        label="Password"
        :validation="usernameValidation"
        @validate="handleValidate"
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
      username,
      password,
      email,
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