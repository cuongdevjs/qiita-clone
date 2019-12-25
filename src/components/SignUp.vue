<template>
  <section class="section">
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
      type="text"
      label="Password"
      :validation="usernameValidation"
      placeholder="Password"
    />

    <div class="field is-grouped" id="signup__controls">
      <div class="control">
        <button @click="handleCancel" class="button is-link is-light">Cancel</button>
      </div>
      <div class="control">
        <button class="button is-primary">Submit</button>
      </div>
    </div>
  </section>  
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref } from '@vue/composition-api'

import { minLength, Rule, format } from '@/components/validation'
import ValidatorInput from '@/components/ValidatorInput.vue'

export default createComponent({
  name: 'SignUp',

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
    const handleCancel = () => {
      ctx.emit('cancel')
    }

    return {
      username: username.value,    
      usernameValidation,
      emailValidation,
      handleCancel,
      passwordValidation: usernameValidation,
      password: password.value,    
      email: email.value,
    }
  }
})
</script>

<style>
#signup__controls {
  justify-content: flex-end;
}
</style>