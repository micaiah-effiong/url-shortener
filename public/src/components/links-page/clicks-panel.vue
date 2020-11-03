<template>
  <div class="panel p-3">
    <div>🚀Clicks</div>
    <div class="flex justify-evenly">
      <LineChart
        class="p-3 ml-3 shadow"
        style="width: 60%; background-color: #fff; border-radius: 6px;"
        :chartdata="dataCollection"
        :options="chartOptions"
      />
      <div
        style="width: 30%; background-color: #3949AB; color: white; border-radius: 6px;"
        class="shadow p-3"
      >
        Today: 3 Last 7 days: 8 Last 30 days: 20 #3949AB
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../chart/line.js";
export default {
  name: "ClicksPanel",
  components: { LineChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          // position: "top",
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: { display: false },
            },
          ],
          yAxes: [
            {
              gridLines: { display: true },
            },
          ],
        },
      },
      dataCollection: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "7 days",
            borderColor: "#673AB7",
            data: [10, 2, 8, 12, 5, 7, 3, 19, 10],
            backgroundColor: "#fff0",
          },
        ],
      },
    };
  },
};
</script>
