<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input 
        class="input" 
        :class="blurred && (validity.valid ? 'is-success' : 'is-danger')"
        :type="type" 
        :placeholder="placeholder" 
        :value="value"
        @input="handleInput"
        @blur="handleBlur"
      >
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

import { Rule, validate } from './validation'

export default createComponent({
  name: 'ValidatorInput',

  props: {
    placeholder: {
      type: String,
      default: ''
    },

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

  setup(props, ctx) {
    let blurred = ref(false)
    let validity = reactive<{ valid: boolean, message?: string }>({
      valid: true,
      message: ''
    })

    const handleBlur = () => {
      if (props.validation) {
        const { valid, message } = validate(props.value, props.validation)
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