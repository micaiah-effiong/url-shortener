<template>
  <div class="group-card shadow">
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
  padding: 10px 20px;
  margin: 13px;
  width: 150px;
}

.card-fig {
  font-size: 3em;
}

.card-text {
  font-size: 20px;
  margin-top: 13px;
}
</style>
