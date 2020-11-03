<template>
  <div class="panel p-3">
    <div>📎Referres</div>
    <div class="flex justify-evenly">
      <div
        style="width: 30%; background-color: #fff; border-radius: 6px;"
        class="shadow p-3"
      >
        <ul>
          <li>twitter.com</li>
          <li>facebook.com</li>
          <li>intergram.com</li>
          <li>linked.in</li>
        </ul>
      </div>
      <PieChart
        class="p-3 ml-3 shadow"
        style="width: 60%; background-color: #fff; border-radius: 6px;"
        :chartdata="dataCollection"
        :options="chartOptions"
      />
    </div>
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
        cutoutPercentage: 55,
      },
      dataCollection: {
        labels: ["One", "Two", "Three"],
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
