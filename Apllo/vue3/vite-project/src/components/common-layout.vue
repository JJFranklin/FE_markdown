<template>
   <main class="flex flex-col w-full h-full p-2.5 pt-0  box-border">
    <div class="header h-10 w-full text-[20px] leading-10">
        消息推送管理
        <!-- <slot name="header"></slot> -->
    </div>
    <div class="main-content flex-1 bg-slate-100">
        <slot name="main-content"></slot>
    </div>
   </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>