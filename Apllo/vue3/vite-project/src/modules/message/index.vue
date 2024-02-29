<template>
    <page-layout>
        <template v-slot:aside>
            <MenuList></MenuList>
        </template>
        <template v-slot:container>
            <CommonLayout></CommonLayout>
        </template>
    </page-layout>
</template>

<script setup>
import MenuList from '../../components/menu-list.vue';

</script>

<style lang="scss" scoped>

</style>