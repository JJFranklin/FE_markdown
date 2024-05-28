<template>
  <div class="content">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.content {
  padding: 20px 15px;
  nav {
    color: $color-text;
  }
}
</style>
