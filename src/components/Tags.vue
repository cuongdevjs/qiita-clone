<template>
  <div class="field is-grouped">
    <input 
      v-model="newTag"
      @keyup.enter="handleCreate"
      type="text" 
      class="input is-small is-inline"
      placeholder="Enter a tag"
    >
    <div class="tags">
      <span 
        v-for="tag of tags" 
        :key="tag" 
        :tag="tag" 
        class="tag"
        @click="handleDelete"
      >
        {{ tag }}
        <button 
          class="delete is-small" 
          @click="() => handleDelete(tag)"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  props: {},

  setup() {
    const newTag = ref('')
    const tags = ref<string[]>([])

    const handleDelete = (tag: string) => {
      tags.value = tags.value.filter(x => x !== tag)
    }

    const handleCreate = () => {
      if (!newTag.value.length || tags.value.includes(newTag.value)) {
        return
      }
      tags.value.push(newTag.value)
      newTag.value = ''
    }

    const handleInput = (e: any) => {
      console.log(e.target.value)
    }

    return {
      handleInput,
      handleCreate,
      handleDelete,
      newTag,
      tags,
    }
  }
})
</script>