
<template>
  <div class="good-container">
    <!-- <el-button type="primary" @click.stop="requiredata">再次请求数据</el-button> -->
    <div class="row-header">
      <span class="header-title">序号</span>
      <span class="header-title">商品名称</span>
      <span class="header-title">价格</span>
      <span class="header-title">描述</span>
    </div>
    <div class="row" v-for="item in goodList" :key="item.index">
      <span class="good-item no">{{ item.index }}</span>
      <span class="good-item name">{{ item.name }}</span>
      <span class="good-item price">{{ item.price }}</span>
      <span class="good-item des">{{ item.des }}</span>
    </div>
  </div>
</template>

<script>
/**
 * 第一种无限加载的组件，采取分页参数的的形式动态加载组件
 * 1、传递分页加载的参数
 * 2、返回的数据和之前的数据拼接在一起
 * 3、控制控制加载时机，滚动到距离底部多少的时候，发起请求
 * 4、防抖处理，掌握触发时机
 * 5、返回的参数和原来的参数拼接在一起
 * 6、先实现，在留接口
 */
//
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {},
  data() {
    return {};

  },
  methods: {
    ...mapActions(["getAllGoodList", "getGoodListByParam"]),
    // requiredata(){
    //   // 模拟分页请求；
    //   let param  = Object.assign({},{page:this.pageInfo.page + 1});
    //   this.getGoodListByParam(param);
    // }, 
  },
  computed: {
    ...mapGetters(["goodList", "pageInfo"]),
  },
  watch: {},
  mounted() {
    this.getAllGoodList();   
  },
};
</script>

<style scoped lang='scss'>
.good-container {
  max-height: 800px;
  overflow-y: auto;
  overflow-x: hidden;
  .row {
    &-header {
      padding: 15px 0;
      background: #f5f7fa;
    }
    padding: 15px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .good-item,
  .header-title {
    display: inline-block;
    min-width: 120px;
    line-height: 32px;
    height: 32px;
    padding-left: 15px;
    box-sizing: border-box;
    &.no {
      text-align: left;
    }
  }
}
</style>
