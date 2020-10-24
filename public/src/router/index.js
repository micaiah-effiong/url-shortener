import Vue from "vue";
import Router from "vue-router";
import Links from "@/components/links-page/links";
import Manage from "@/components/manage";
import Personal from "@/components/personal";
import Overview from "@/components/overview";

Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/links",
      name: "Links",
      component: Links,
    },
    {
      path: "/manage",
      name: "Manage",
      component: Manage,
    },
    {
      path: "/personal",
      name: "Personal",
      component: Personal,
    },
    {
      path: "/overview",
      name: "Overview",
      component: Overview,
    },
  ],
});
