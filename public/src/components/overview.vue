<template>
  <div class="overview-panel">
    <StatisticsCard :figure="200" text="Total clicks" />
    <StatisticsCard :figure="30" text="Total links" />
    <StatisticsCard :figure="60" text="Top referrer clicks" />
    <StatisticsCard :figure="10" text="Small one" />
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
.overview-panel {
  padding: 3px 13px;
  display: flex;
  justify-content: space-evenly;
}
@media (max-width: 650px) {
  .overview-panel {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
