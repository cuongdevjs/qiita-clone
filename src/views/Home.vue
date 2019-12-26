<template>
  <div class="columns">
    <div class="column">
      <!-- placeholder -->
    </div>

    <div class="column is-two-thirds">
      <Timeline />
    </div>

    <div class="column">
      <!-- placeholder -->
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline/Timeline.vue'

export default {
  name: 'home',
  props: {},
  components: {
    Timeline
  }
}
</script>
