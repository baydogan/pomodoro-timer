import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: () => import("@/views/SignUp"),
  },

  {
    path: "/ResetPassword",
    name: "ResetPassword",
    component: () => import("@/views/ResetPassword"),
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
