<template>
  <div class="">
    <div class="chart-panel mt-8 mr-auto ml-auto">
      <LineChart :chartdata="dataCollection" :options="chartOptions" />
    </div>
    <div class="card-panel">
      <StatisticsCard :figure="200" text="Total clicks" />
      <StatisticsCard :figure="30" text="Total links" />
      <StatisticsCard :figure="60" text="Top referrer" />
      <StatisticsCard :figure="10" text="Top link" />
    </div>
  </div>
</template>

<script>
import LineChart from "./chart/line.js";
import StatisticsCard from "./statistics-card.vue";
export default {
  name: "Overview",
  components: { StatisticsCard, LineChart },
  data() {
    return {
      chartOptions: {
        legend: false,
        responsive: true,
        maintainAspectRatio: false,
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
        labels: ["One", "Two", "Three"],
        datasets: [
          {
            label: "Data One",
            borderColor: "#087979",
            backgroundColor: "#fff0",
            pointRadius: 5,
            data: [10, 40, 0],
          },
          {
            label: "Data One",
            borderColor: "#f84f79",
            backgroundColor: "#fff0",
            pointRadius: 5,
            data: [30, 20, 40],
          },
          {
            label: "Data One",
            borderColor: "#f879ca",
            backgroundColor: "#fff0",
            pointRadius: 5,
            data: [34, 2, 23],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.card-panel {
  padding: 3px 13px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.chart-panel {
  width: 90%;
}

@media (max-width: 650px) {
  .card-panel {
    flex-wrap: wrap;
    /*justify-content: space-between;*/
  }
}
</style>
