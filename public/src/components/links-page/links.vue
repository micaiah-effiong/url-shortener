<template>
  <div class="group">
    <div class="group-card" v-for="(i, y) in links" v-bind:key="y">
      <div class="card-item">
        <div>slug</div>
        <div>{{ i.slug }}</div>
      </div>
      <div class="card-item">
        <div>clicks</div>
        <div>{{ i.clicks }}</div>
      </div>
      <div class="card-item">
        <div>URL</div>
        <div>{{ i.url.slice(0, 13) }}...</div>
      </div>
      <!-- <div class="card-item">
        <div>createdAt</div>
        <div>{{ i.createdAt }}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Links",
  data() {
    return {
      links: [
        {
          slug: "sdsfss",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com/afsdffdjfgh/dfnskug",
          clicks: 2,
        },
        {
          slug: "sdsfss",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com",
          clicks: 4,
        },
        {
          slug: "sdsfss",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com",
          clicks: 10,
        },
        {
          slug: "sdsfss",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com",
          clicks: 6,
        },
      ],
    };
  },
  created() {
    const self = this;
    fetch("http://localhost:8000/links" /*, { mode: "no-cors" }*/)
      .then((res) => res.json())
      .then((data) => (self.links = data));
  },
};
</script>

<style scoped>
.group {
  display: flex;
  text-align: left;
  padding: 13px;
  border-radius: 7px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.group-card {
  width: 29%;
  background-color: #70bcf9;
  border-radius: 5px;
  box-shadow: 0 0 11px #a8a3a3;
  padding: 10px 6px;
  margin: 13px 0;
}

.card-item {
  display: flex;
  justify-content: space-between;
}

.group > div > div {
  padding: 3px;
}

@media (min-width: 1200px) {
  .group-card {
    width: 21%;
  }
}

@media (max-width: 800px) {
  .group-card {
    width: 45%;
  }
  .group {
    justify-content: space-evenly;
  }
}

@media (max-width: 550px) {
  .group > div {
    width: 70%;
  }
  .group {
    justify-content: space-evenly;
  }
}
</style>
