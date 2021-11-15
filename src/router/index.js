import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import PensionServices from "@/views/PensionServices";
import NotFound from "@/components/NotFound";
import ServePerson from "@/views/ServePerson";
import OldPersonList from "@/views/OldPersonList";
import ProvideOrganization from "@/views/ProvideOrganization";
import axios from "axios";
import Detail from "@/views/Detail";

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
      path: "/pensionServices",
      name: "PensionServices",
      component: PensionServices,
      meta: {
        title: "PensionServices"
        // requireAuth: true
      }
    },
    {
      path: "/detail/:name?",
      name: "Detail",
      component: Detail,
      meta: {
        title: "Detail"
        // requireAuth: true
      }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "NotFound"
      }
    },
    {
      path: "/servePerson/:organizationCode",
      name: "ServePerson",
      component: ServePerson,
      meta: {
        title: "ServePerson"
      }
    },
    {
      path: "/oldPersonList/:organizationCode",
      name: "OldPersonList",
      component: OldPersonList,
      meta: {
        title: "OldPersonList"
      }
    },
    {
      path: "/provideOrganization/:name",
      name: "ProvideOrganization",
      component: ProvideOrganization,
      meta: {
        title: "ProvideOrganization"
      }
    }
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
