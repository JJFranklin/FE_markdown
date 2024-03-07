<template>
  <page-layout>
      <template v-slot:aside>
          <MenuList></MenuList>
      </template>
      <template v-slot:container>
          <CommonLayout>
            <template v-slot:main-content>
              <router-view></router-view>
            </template>
          </CommonLayout>
      </template>
  </page-layout>
</template>

<script setup>
import MenuList from '@/components/menu-list.vue';

</script>

<style lang="scss" scoped>

</style>