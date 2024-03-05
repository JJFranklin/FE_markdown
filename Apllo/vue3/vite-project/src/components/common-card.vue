<template>
    <div class="card">
    我是具体内容 {{ cardIndex }}
    </div>
</template>

<script setup>

const props = defineProps({
  cardIndex:{
    type:Number,
    default: 0
  }
});


</script>

<style lang="scss" scoped>
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  // width: 200px;
  max-height: 300px;
  background: #fff;
}
</style>