import Vue from "vue";
import Router from "vue-router";
import Links from "@/components/links-page/links";
import EditLink from "@/components/links-page/edit";
import LinkDetails from "@/components/links-page/link-details";
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
      exact: true,
      component: Links,
    },
    {
      path: "/links/:id",
      component: LinkDetails,
      children: [
        {
          path: "edit",
          component: EditLink,
        },
      ],
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
