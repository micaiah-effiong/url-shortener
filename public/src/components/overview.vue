<template>
  <div class="">
    <div class="card-panel">
      <StatisticsCard :figure="200" text="Total clicks" />
      <StatisticsCard :figure="30" text="Total links" />
      <StatisticsCard :figure="60" text="Top referrer" />
      <StatisticsCard :figure="10" text="Top link" />
    </div>
    <div class="chart-panel">Chart Here</div>
  </div>
</template>

<script>
import StatisticsCard from "./statistics-card.vue";
export default {
  name: "Overview",
  components: { StatisticsCard },
};
</script>

<style scoped>
.card-panel {
  padding: 3px 13px;
  display: flex;
  justify-content: space-evenly;
}

@media (max-width: 650px) {
  .card-panel {
    flex-wrap: wrap;
  }
}
</style>
