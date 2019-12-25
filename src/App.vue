<template>
  <div>
    <portal-target name="modal">
      <!--
      This component can be located anywhere in your App.
      The slot content of the above portal component will be rendered here.
      -->
    </portal-target>

    <TopNav />

    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>

  </div>
</template>

<script lang="ts" src="./app.ts">
</script>