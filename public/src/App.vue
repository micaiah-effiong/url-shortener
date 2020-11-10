<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>

import Dashboard from "./components/dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>


<style>
 @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');
* {
   font-family: karla;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
