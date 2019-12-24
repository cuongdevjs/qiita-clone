<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control has-icons-left has-icons-right">
      <input 
        class="input is-success" 
        type="text" 
        placeholder="Text input" 
        :value="value"
        @input="handleInput"
        @blur="handleBlur"
      >
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>
      <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
    <span v-if="blurred">
      <p v-if="validity.valid" class="help is-success">{{ validity.message }}</p>
      <p v-else class="help is-danger">{{ validity.message }}</p>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref, reactive } from '@vue/composition-api'

import { Rule, validate } from '@/components/validation'

export default createComponent({
  props: {
    label: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    validation: {
      type: Array as () => Rule[],
      required: false,
    }
  },

  name: 'ValidatorInput',

  setup(props, ctx) {
    let blurred = ref(false)
    let validity = reactive<{ valid: boolean, message?: string }>({
      valid: true,
      message: ''
    })

    const handleBlur = () => {
      if (props.validation) {
        const { valid, message } = validate(props.value, props.validation, 'All good')
        validity.valid = valid
        validity.message = message
        blurred.value = true
      }
    }

    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
    }

    return {
      handleInput,
      handleBlur,
      validity,
      blurred,
    }
  }
})
</script>