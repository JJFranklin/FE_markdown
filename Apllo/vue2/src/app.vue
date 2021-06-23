<template>
  <el-container class="wrap">
    <el-aside class="aside" width="200px">
      <div-menu></div-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div-header></div-header>
      </el-header>

      <el-main>
        <div-main></div-main>
      </el-main>
      <el-footer class="footer">
        <div-footer></div-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@components/menu";
import Header from "@components/header";
import Main from "@components/main";
import Footer from "@components/footer";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
   this.$bus.$on("changetheme",()=>{
     console.log("1")
   });
  this.$bus.$on("changetheme",()=>{
     console.log("2")
   });
  },
  components: {
    "div-menu": Menu,
    "div-header": Header,
    "div-main": Main,
    "div-footer": Footer,
  },
};
</script>

<style lang='scss' scoped>
.wrap {
  height: 100vh;
  border: 1px solid #eee;
  .aside {
    background-color: rgb(238, 241, 246);
    color: #333;
  }
  .header,
  .footer {
    text-align: right;
    font-size: 12px;
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .footer{
      text-align: center;
      font-size: 14px;
  }
}
</style>