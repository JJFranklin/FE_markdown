<template>
    <div class="card" @click="showDetail">
    我是具体内容 {{ cardIndex }}
    </div>
</template>

<script setup>
import {useAttrs} from "vue";

const $attrs = useAttrs();

console.log('$attrs', $attrs.order);

// defineEmits 数组可以接受多个自定义事件 defineEmits(['showDetail', 'a', 'b', ]);
const $emit = defineEmits(['showDetail']);

const props = defineProps({
  cardIndex:{
    type:Number,
    default: 0
  }
});

function showDetail(){
  $emit('showDetail','woshi detail');
}


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
  cursor: pointer;
}
</style>