import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Insert from "../pages/insert.vue";
import InsertSpace from "../pages/insertSpace.vue";
import Details from "../pages/detail/_id.vue";
import Main from "../pages/main.vue";
import SelectAll from "../pages/selectAll/_id.vue";
import SelectAllMap from "../pages/selectAll/selectAllMap.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/insert",
      name: "insert",
      component: Insert,
    },
    {
      path: "/insertSpace",
      name: "InsertSpace",
      component: InsertSpace,
    },
    {
      path: "/detail/:id",
      name: "Details",
      component: Details,
    },
    {
      path: "/main",
      name: "Main",
      component: Main,
    },
    {
      path: "/selectAll/:id",
      name: "SelectAll",
      component: SelectAll,
      props: true,
    },
    {
      path: "/selectAll/selectAllMap",
      name: "SelectAllMap",
      component: SelectAllMap,
    },
  ],
});
export default router;
