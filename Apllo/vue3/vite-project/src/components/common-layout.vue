<template>
   <main class="flex flex-col w-full h-full p-2.5 pt-0  box-border">
    <div class="header h-10 w-full text-[20px] leading-10">
        消息推送管理
        <!-- <slot name="header"></slot> -->
    </div>
    <div class="main-content flex-1 bg-slate-100 overflow-auto p-2 box-border">
        <slot name="main-content"></slot>
    </div>
   </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.main-content{
    height: calc(100% - 4.5rem);
}

</style>