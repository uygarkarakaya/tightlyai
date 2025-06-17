import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import UserDetail from "../views/UserDetail.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/user/:id", name: "UserDetail", component: UserDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
