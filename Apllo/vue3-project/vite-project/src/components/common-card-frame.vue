<template>
    <div class="card-frame overflow-auto">
      <slot :othername="name" :sex="sex"></slot>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const name = ref(5);
const sex = ref(8);

</script>

<style lang="scss" scoped>
.card-frame{
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 6px;

  // grid-template-columns: repeat(3, minmax(300px, 1fr));
  // grid-template-rows: repeat(4, minmax(300px, 1fr));
  // grid-auto-flow: row;
  // grid-template-columns: [c1] 200px [c2] 300px [c3] 1fr [c4];
  // grid-template-rows: [r1] 400px [r2] 200px [r3] 100px [r4];

  // grid-column-start: 3;
  // grid-row-start: 3;
  // justify-items: center;
  // align-items: center;
  // justify-self: center;
  // align-self: center;
  // display:  flex;
  // align-items: center;
  // flex-wrap: wrap;
  // justify-content: center;
  // flex-direction: row;
}
</style>