<template>
  <main>
    <header>
      <h1>USER DASHBOARD</h1>
    </header>
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="main-page">
        <router-view>Main Page</router-view>
      </div>
    </div>
  </main>
</template>

<script>
import SideBar from "./side-bar/side-bar.vue";
export default {
  name: "Dashboard",
  components: { SideBar },
};
</script>

<style scoped>
main > header {
  width: 100%;
  height: 7%;
}
main {
  height: 100vh;
}

main > div {
  height: 90%;
  display: flex;
  flex-wrap: wrap;
}

.sidebar {
  width: 20%;
  position: relative;
  background-color: #3949ab;
}

.main-page {
  width: 80%;
  background-color: #f5f5f5;
}
</style>
