<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input 
        class="input" 
        :name="name"
        :class="dirty && (validity.valid ? 'is-success' : 'is-danger')"
        :type="type" 
        :placeholder="placeholder" 
        :value="value"
        @input="handleInput"
        @keyup="handleValidation"
      >
    </div>

    <span v-if="dirty">
      <p v-if="validity.valid" class="help is-success">{{ validity.message }}</p>
      <p v-else class="help is-danger">{{ validity.message }}</p>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createComponent, ref, reactive } from '@vue/composition-api'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import { Rule, validate } from './validation'

export default createComponent({
  name: 'ValidatorInput',

  props: {
    name: {
      type: String,
      required: true,
    },

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
    let validity = reactive<{ valid: boolean, message?: string }>({
      valid: true,
      message: ''
    })
    const dirty = ref(false)

    const handleValidation = debounce(() => {
      const { valid, message } = validate(props.value, props.validation!)
      validity.valid = valid
      validity.message = message
      ctx.emit('validate', props.name, valid)
    }, 500)

    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
      dirty.value = true

      if (!props.validation) {
        ctx.emit('validate', props.name, true)
      }
    }

    return {
      dirty,
      validity,
      handleInput,
      handleValidation,
    }
  }
})
</script>