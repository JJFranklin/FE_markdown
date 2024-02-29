<template>
    <div class="page-layout flex h-full flex-col">
        <header class="h-12 w-full bg-gray-200">
            <slot>
                <span class="title text-left h-full leading-12 pl-3 text-[28px] inline-block">模块管理</span>
            </slot>
            <!-- <slot name="header-left"></slot>
            <slot name="hader-center"></slot>s
            <slot name="header-right"></slot> -->
        </header>
        <main class="flex-1 flex">
            <aside class="h-full w-50">
                <slot name="aside"></slot>
            </aside>
            <div class="content flex-1 h-full">
                <!-- <div class="content-header">
                    <slot name="content-header"></slot>
                </div> -->
                <el-container class="h-full">
                    <slot name="container"></slot>
                </el-container>
            </div>
        </main>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>


</style>