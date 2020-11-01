<template>
  <div class="flex">
    <div class="link-dtl">
      <div style="font-size: 12px;">
        <span> <time datetime="10-25-2020"> Sun Oct 25 2020</time></span> |
        Micaiah Effiong
      </div>
      <div class="gap-t"><h3>The testing link</h3></div>
      <p style="font-size: 1.5em; word-wrap: anywhere;">
        http://ihsdckb.dfdsf.dfsdfnhs/csdf/fsfd
      </p>
      <div>http://reduce.com/temp-state</div>
      <div class="gap-t">
        <button class="option-btn">EDIT</button>
        <button class="option-btn">SHARE</button>
        <button class="option-btn">MANAGE USER</button>
        <button class="option-btn">QR CODE</button>
      </div>
    </div>
    <ClicksPanel />
    <ReferrersPanel />
  </div>
</template>

<script>
// import axios from "axios";
import ClicksPanel from "./clicks-panel";
import ReferrersPanel from "./referrers-panel";
export default {
  name: "Links",
  components: { ClicksPanel, ReferrersPanel },
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
    // const self = this;
    // axios.get("http://localhost:8000/links").then((res) => {
    //   console.log(res);
    // });
    // .then((data) => (self.links = data));
  },
};
</script>

<style scoped>
.link-dtl {
  width: 100%;
  padding: 7px;
}

.link-dtl > div {
  margin-top: 5px;
  margin-bottom: 5px;
}

.option-btn {
  background-color: #f5f5f5;
  border: 1px solid #8bc34a;
  padding: 1px 3px;
  margin: 1px 3px;
  border-radius: 5px;
  transition: 0.5s;
}

.option-btn:active {
  background-color: #8bc34a;
  transition: 0.5s;
}

.flex {
  display: flex;
  /*height: 100%;*/
  flex-wrap: wrap;
}

div.gap-t {
  margin-top: 15px;
}

.panel {
  width: 50%;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .panel {
    width: 100%;
  }
}
</style>
