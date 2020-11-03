<template>
  <div
    class="relative"
    style="width: 100% ;height: 100%; background-color: #f5f5f5;"
  >
    <div class="p-3">
      <ul>
        <li v-for="link in links" :key="link.slug">
          <div>{{ link.slug }}</div>
          <div>{{ link.url }}</div>
          <div>{{ link.click }}</div>
          <router-link :to="link.slug" append>View</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import LinkDetails from "./link-details";
export default {
  name: "Links",
  // components: { LinkDetails },
  data() {
    return {
      links: [
        {
          slug: "khgj",
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
          slug: "cvbvn",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com",
          clicks: 10,
        },
        {
          slug: "e45ew",
          createdAt: "2020-10-21T12:43:06.612Z",
          url: "www.google.com",
          clicks: 6,
        },
      ],
    };
  },
  created() {
    // const self = this;
    // axios.get("http://localhost:8000/links").then((res) => {
    //   console.log(res);
    // });
    // .then((data) => (self.links = data));
  },
};
</script>
