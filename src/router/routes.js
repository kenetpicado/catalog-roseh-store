import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/Home.vue'),
  },
  {
    path: "/details/:id",
    name: "details",
    component: () => import('../views/Details.vue')
  },
  {
    path: "/category/:id",
    name: "category",
    component: () => import('../views/Category.vue')
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import('../views/Cart.vue')
  },
  {
    path: "/directory",
    name: "directory",
    component: () => import('../views/Directory.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;