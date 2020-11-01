<template>
  <div class="panel">
    <div>🚀Clicks</div>
    <PieChart :chartdata="dataCollection" :options="chartOptions" />
    <div>Info here</div>
  </div>
</template>

<script>
import PieChart from "../chart/pie.js";
export default {
  name: "ClicksPanel",
  components: { PieChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "bottom",
        },
      },
      dataCollection: {
        labels: ["1", "2", "3"],
        datasets: [
          {
            data: [70, 50, 60],
            backgroundColor: ["#0D47A1", "#1976D2", "#2196F3"],
          },
        ],
      },
    };
  },
};
</script>
