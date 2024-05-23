<template>
  <div>obj1: {{ obj1.a }} {{ obj1.b }}</div>
  <!-- <div>obj2: {{ obj2.a }} {{ obj2.b }}</div> -->
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue';

const obj1 = ref({
  a: 1,
  b: 2
});
console.log('obj1', obj1);

setTimeout(()=>{
  obj1.a = 2000;
  console.log('obj1', obj1);
},1000);
const obj1ToRefs = toRefs(obj1);

console.log('obj1ToRefs', obj1ToRefs);

</script>

<style scoped lang='scss'></style>