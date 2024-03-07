<template>
  <div class="cad-list">
    <CommonCardFrame>
      <template v-slot:default="{ othername, sex }">
        <CommonCard
          v-for="i in 4"
          :cardIndex="i + othername + sex"
        ></CommonCard>
      </template>
    </CommonCardFrame>
  </div>
</template>

<script setup>
import CommonCardFrame from "@/components/common-card-frame.vue";
import CommonCard from "@/components/common-card.vue";
</script>

<style lang="scss" scoped>
.cad-list {
  overflow: auto;
}
</style>
