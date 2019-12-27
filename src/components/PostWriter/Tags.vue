<template>
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
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  props: {
    tags: {
      type: Array as () => string[],
      required: true,
    }
  },

  setup(props, ctx) {
    const handleDelete = (tag: string) => {
      ctx.emit('removeTag', tag)
    }

    return {
      handleDelete,
    }
  }
})
</script>