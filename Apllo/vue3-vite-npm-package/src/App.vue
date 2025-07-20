<template>
  <div>
    <div class="item">
      <TrinaCustomForm></TrinaCustomForm>
    </div>
    <div class="item table">
      <TrinaCustomTable></TrinaCustomTable>
    </div>
  </div>
</template>

<script setup>
import TrinaCustomForm from './packages/trina-custom-form/index.vue';
import TrinaCustomTable from './packages/trina-custom-table/index.vue'

</script>

<style scoped lang="scss">
.item {
  max-width: 600px;
  &.table {
    max-width: 1200px;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
