import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import NotFound from "@/components/NotFound";

Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: "/index/:cid?",
      name: "Index",
      component: Index,
      meta: {
        title: "Index",
        requireAuth: true
      }
    },
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "NotFound"
      }
    },
  ]
});

// router.beforeEach(async (to, from, next) => {
//   await axios.post("/login/getToken").then(res => {
//     let data = res && res.data && res.data.data;
//     if (data) {
//       localStorage.setItem("token", data);
//       axios.defaults.headers["token"] = data;
//     }
//   });
//   next();
// });

export default router;
