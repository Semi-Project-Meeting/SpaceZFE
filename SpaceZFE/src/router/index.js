import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Insert from "../pages/insert.vue";
import Details from "../pages/detail/_id.vue";
import Main from "../pages/main.vue";
import SelectAll from "../pages/selectAll/_id.vue";

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
  ],
});
export default router;
