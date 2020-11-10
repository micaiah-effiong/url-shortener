<template>
  <div
    class="relative"
    style="width: 100% ;height: 100%; background-color: #f5f5f5;"
  >
    <div class="p-3">
      <div class="bg-white overflow-auto">
        <ul>
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th
                  class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Slug
                </th>
                <th
                  class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Url
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Click
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  View
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700" v-for="link in links" :key="link.slug">
              <tr class="bg-gray-200">
                <td class="w-1/3 text-left py-3 px-4">{{ link.slug }}</td>
                <td class="w-1/3 text-left py-3 px-4">{{ link.url }}</td>
                <td class="text-left py-3 px-4">
                  {{ link.clicks }}
                </td>
                <td class="text-left py-3 px-4">
                  <router-link :to="link.slug" append>View</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </ul>
      </div>
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
          url: "www.google.com",
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
