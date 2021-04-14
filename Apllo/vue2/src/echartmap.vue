<template>
  <div class="wrap">
    <div class="export">
      <span title="下载" class="el-icon-download"></span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>

<style scoped lang='scss'>
.wrap {
  width: 900px;
  margin: 24px auto;
  background: #f2f3f4;
  border-radius: 4px;
  .export {
    padding: 8px 24px;
    span {
      float: right;
    }
    [class^="el-icon"] {
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: #2e73ff;
      }
    }
    &::after {
      content: " ";
      display: block;
      clear: both;
    }
  }
}
</style>
