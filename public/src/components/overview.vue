<template>
  <div>
    <div>Overview Page</div>
    <StatisticsCard :figure="200" text="Clicks" />
    <StatisticsCard :figure="30" text="Total Links" />
    <StatisticsCard :figure="60" text="Something else" />
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
