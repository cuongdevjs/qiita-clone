<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Posts
    </p>

    <div 
      v-if="loading"
      class="panel-block"
    >
      Loading...
    </div>

    <span v-else>
      <p class="panel-tabs">
        <a class="is-active">Today</a>
        <a>This Week</a>
        <a>This Month</a>
      </p>
      <a 
        v-for="article in articles" 
        :key="article.id"
        class="panel-block"
      >
        <div class="level">
          <div>
            <div>
              <a href="#" class="link">
                {{ article.title }}
              </a>
            </div>
            <div class="has-text-grey-light">
            By <a href="#" class="link">
              {{ getUser(article).username }}
            </a> {{ article.created.fromNow() }} <i class="far fa-thumbs-up"></i> {{ article.likes }}
            </div>
          </div>
        </div>
      </a>
    </span>
  </nav>
</template>

<script lang="ts" src="./component.ts" />

<style scoped>
a.link:hover {
  text-decoration: underline;
}
</style>