<template>
  <div class="he-input_wrapper">
    <!-- 前缀 -->
    <template> </template>
    <input class="he-input" type="text" />
    <!-- 后缀 -->
    <template v-if="append">
      <span class="append">{{ append }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "heInput",
  props: {
    append: {
      type: String,
      default: ".com",
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.he-input_wrapper {
  border: 1px solid #b3b8c1;
  border-radius: 4px;
  display: inline-block;
  vertical-align: top;

  .he-input {
    height: 34px;
    line-height: 30px;
    padding: 4px 0 4px 4px;
    border: none;
    width: 240px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    border:none;
    outline:none
  }

  .append {
    display: inline-block;
    line-height: 30px;
    height: 34px;
    min-width: 32px;
    background: #f2f3f4;
    padding: 2px 8px;
    box-sizing: border-box;
    border-radius: 0 4px 4px 0;
    vertical-align: middle;
  }
}
</style>
