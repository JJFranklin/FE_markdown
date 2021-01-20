<template>
  <div class="">
    <h3>css使用技巧</h3>
    <h4>1、结构和布局</h4>
    <div class="n-th-child">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
      <div class="box">6</div>
      <div class="box">7</div>
      <div class="box">8</div>
    </div>
  </div>
</template>

<script>
// 收集css 的使用技巧
export default {
  name: "CssTrack",
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
.n-th-child {
  max-width: 800px;
  .box {
    height: 200px;
    width: 300px;
    padding:calc(50% - 300px);

    margin-bottom: 20px;
    &:first-child{
      background: red;
    }
  }

}
</style>
