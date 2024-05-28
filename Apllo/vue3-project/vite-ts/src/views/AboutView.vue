<template>
  <div class="about">
    <h1>This is an {{ name }} page</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('franklin')
</script>
