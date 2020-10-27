<template>
  <div class="group-card">
    <div class="card-fig">
      {{ figure }}
    </div>
    <div class="card-text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics-Card",
  props: {
    figure: Number,
    text: String,
  },
};
</script>

<style scoped>
.group-card {
  background-color: #70bcf9;
  border-radius: 5px;
  box-shadow: 0 0 6px #a8a3a3;
  padding: 10px 20px;
  margin: 13px 0;
}

.card-fig {
  font-size: 3em;
}

.card-text {
  font-size: 20px;
}
</style>
