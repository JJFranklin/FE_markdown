<template>
 <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
</template>

<script>
import EventBus from './eventBus/eventbus';
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    mounted() {
      EventBus.$on('click1',()=>{
        console.log('我是测试1');
      });
      EventBus.$on('click1',()=>{
        console.log('我是测试2');
      });
    },
};
</script>

<style scoped lang='scss'>

</style>
