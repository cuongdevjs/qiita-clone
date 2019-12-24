<template>
  <div>
    <TopNav />

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            ...
          </div>

          <div class="column is-two-thirds">
            <Timeline />
          </div>

          <div class="column">
            ...
          </div>
        </div>
      </div>
    </section>

    <div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts" src="./app.ts">
</script>

<style>
</style>
