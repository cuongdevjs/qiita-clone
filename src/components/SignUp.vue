<template>
  <div>
    <ValidatorInput 
      v-model="username"
      type="text"
      label="Username"
      :validation="usernameValidation"
    />

    <div class="field">
      <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
        <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p class="help is-danger">This email is invalid</p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-danger" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p class="help is-danger">This email is invalid</p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref } from '@vue/composition-api'

import { minLength, Rule } from '@/components/validation'
import ValidatorInput from '@/components/ValidatorInput.vue'

export default createComponent({
  name: 'SignUp',

  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('')
    const password = ref('')
    const email = ref('')

    const usernameValidation: Rule[] = [
      minLength({ min: 5, max: 20 })
    ]

    return {
      username: username.value,    
      usernameValidation,
      password: password.value,    
      email: email.value,
    }
  }
})
</script>