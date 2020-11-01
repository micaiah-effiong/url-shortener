<template>
  <div class="panel">
    <div>📎Referres</div>
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
            backgroundColor: ["#B71C1C", "#E53935", "#E57373"],
          },
        ],
      },
    };
  },
};
</script>
