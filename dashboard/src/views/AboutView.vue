<template>
  <div class="about">
    <div id="lineChart" style="height: 300px; width: 100% padding:10px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

function drawLineChart() {
  const lineChart: HTMLElement = document.getElementById(
    "lineChart"
  ) as HTMLElement;
  const myChart = echarts.init(lineChart).setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  return myChart;
}

onMounted(() => {
  drawLineChart();
});
</script>

<style scoped></style>
