import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/auth/:initialMode?",
    name: "auth",
    component: () => import("@/pages/AuthPage.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/tickets",
    name: "tickets",
    component: () => import("@/pages/Tickets.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (authStore.user?.sessionActive && to.name === "auth") {
    return { path: "/dashboard" };
  }
  if (to.meta.requiresAuth && !authStore.user?.sessionActive) {
    return {
      path: "/auth/login",
      query: { redirect: to.fullPath },
    };
  }

  return true;
});

export default router;
