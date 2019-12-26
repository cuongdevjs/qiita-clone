<template>
  <div class="modal is-active">
    <div 
      class="modal-background"
      @click="hide"
    >
    </div>
    <div class="modal-content">
      <div class="card">
        <slot />
      </div>
      <!-- Any other Bulma elements you want -->
    </div>
    <!--
    <button class="modal-close is-large" aria-label="close"></button>
    -->
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {},

  setup(props, ctx) {
    const hide = () => {
      ctx.emit('hide')
    }

    return {
      hide
    }
  },
})
</script>