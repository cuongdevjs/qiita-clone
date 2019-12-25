<template>
  <div>
    <ValidatorInput 
      v-model="title"
      type="text"
      :validation="titleValidation"
      placeholder="Title"
    />
    <div class="columns">
      <div class="column one-half">
        <textarea 
          class="textarea"
          v-model="content"
        />
      </div>
      <div class="column one-half">
        <textarea 
          class="textarea"
          v-model="content" 
        />
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import ValidatorInput from '@/components/ValidatorInput.vue'
import { minLength } from '@/components/validation'

export default createComponent({
  name: 'NewPost',

  components: {
    ValidatorInput,
  },

  setup() {
    const title = ref('')
    const content = ref('')
    const titleValidation = [ minLength({ min: 5, max: 100 }) ]

    return {
      content,
      title,
      titleValidation,
    }
  }
})
</script>