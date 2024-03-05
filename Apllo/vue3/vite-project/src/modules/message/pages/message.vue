<template>
    <page-layout>
        <template v-slot:aside>
            <MenuList></MenuList>
        </template>
        <template v-slot:container>
            <CommonLayout>
              <template v-slot:main-content>
                <div class="cad-list" >
                  <CommonCardFrame>
                    <template v-slot:default="{othername,sex}">
                      <CommonCard v-for="i in 4" :cardIndex="i+ othername + sex"></CommonCard>
                    </template>
                  </CommonCardFrame>
                </div>
              </template>
            </CommonLayout>
        </template>
    </page-layout>
</template>

<script setup>
import MenuList from '../../components/menu-list.vue';
import CommonCardFrame from '../../components/common-card-frame.vue';
import CommonCard from '../../components/common-card.vue';

</script>

<style lang="scss" scoped>
.cad-list{
  overflow: auto;
}

</style>