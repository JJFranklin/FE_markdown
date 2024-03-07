<template>
  <page-layout>
      <template v-slot:aside>
          <MenuList></MenuList>
      </template>
      <template v-slot:container>
          <CommonLayout >
            <template v-slot:header>{{ curModuleName }}</template>
            <template v-slot:main-content>
              <router-view></router-view>
            </template>
          </CommonLayout>
      </template>
  </page-layout>
</template>

<script setup>
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import MenuList from '@/components/menu-list.vue';

const router = useRouter();
router.push({
  path:"/"
});

let curModuleName = ref("");

watch(
  ()=>router.currentRoute,
  (newVal,oldVal)=>{
    curModuleName.value = newVal.value.name;
  },
  {
    immediate:true,
    deep:true
  }
);

</script>

<style lang="scss" scoped>

</style>