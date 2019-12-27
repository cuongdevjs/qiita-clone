<template>
  <span 
    id="profile-control"
    @click="showProfile = !showProfile"
  >
    <a
      class="button is-info"
    >
      <img 
        class="image is-32x32"
        src="https://curatti.com/wp-content/uploads/2017/05/generic-avatar-image1.png"
      />
    </a>
    <div 
      v-show="showProfile"
      class="profile__dropdown"
    >
      <aside class="menu">
      <ul class="menu-list">
        <li>
          <a>Posts</a>
        </li>
        <li>
          <a>Edit Requests</a>
        </li>

        <li>
          <a 
            data-test-logout
            @click="handleLogout"
          >Logout</a>
        </li>
      </ul>
      </aside>
    </div>
  </span>
</template>

<script lang="ts"> 
import { createComponent, ref } from '@vue/composition-api'

import { useUsers } from '@/store/users'

export default createComponent({
  setup(props, ctx) {
    const showProfile = ref(false)
    const handleLogout = () => ctx.emit('logout')

    return {
      showProfile,
      handleLogout,
    }
  }
})
</script>

<style scoped>
#profile-control {
  position: relative;
}

.profile__dropdown {
  background: white;
  padding: 8px;
  position: absolute;
  width: 150px;
  right: 8px;
  border: 1px solid;
  z-index: 50;
  border-color: #dbdbdb;
}
</style>