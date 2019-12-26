<template>
  <span 
    id="profile-control"
    @click="showProfile = true"
  >
    <a
      class="button is-info"
    >
      <img 
        class="image is-32x32"
        src="https://curatti.com/wp-content/uploads/2017/05/generic-avatar-image1.png"
      />
    </a>
    <div class="profile__dropdown">
      Blah blah blah
    </div>
  </span>
</template>

<script lang="ts"> 
import { createComponent, ref } from '@vue/composition-api'

import { useUsers } from '@/store/users'

export default createComponent({
  setup(props, ctx) {
    const showProfile = ref(false)

    return {
      showProfile,
    }
  }
})
</script>

<style scoped>
#profile-control {
  position: relative;
}

.profile__dropdown {
  position: absolute;
  width: 150px;
  right: 0px;
  border: 1px solid;
  border-color: #dbdbdb;
}
</style>