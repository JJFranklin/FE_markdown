<template>
  <div class="wrap">
    <div class="echarts" ref="echartsRef">

    </div>

  </div>
</template>

<script setup>
import * as $echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const echartsRef = ref();

onMounted(() => {
  initChart();
});

function initChart() {
  let chart = $echarts.init(echartsRef.value);
  chart.setOption({
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    },
    tooltip: {
      trigger: "axis"
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [
          80,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          801,
          102,
          230,
          4321,
          4129
        ],
        type: "line",
        smooth: true
      }
    ]
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
    console.log('24214');
  };
}

onBeforeUnmount(() => {
  $echarts.dispose();
});

</script>

<style lang="scss" scoped>
.wrap {
  width: 800px;
  height: 800px;
  background: red;

  .echarts {
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }
}
</style>