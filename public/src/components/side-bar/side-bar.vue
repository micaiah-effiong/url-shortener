<template>
  <nav>
    <router-link to="/overview"><li>Overview</li></router-link>
    <router-link to="/links"><li>Links</li></router-link>
    <router-link to="/manage"><li>Manage</li></router-link>
    <router-link to="/personal"><li>Personal</li></router-link>
  </nav>
</template>

<script>
export default {
  name: "Side-Bar",
};
</script>

<style scoped>
nav {
  padding: 7px 0;
}

li {
  text-align: left;
  list-style-type: none;
}

a {
  padding: 13px;
  display: block;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

a:hover {
  background-color: #70bcf9;
}
</style>
