import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import useQuickSearch from "../state/quickSearchStore"
const Search = () => import("../views/Search.vue")
const Collection = () => import("../views/Collection.vue")
const Product = () => import("../views/Product.vue")
const WC = () => import("../views/WebComponent.vue")
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    props: (route) => ({ searchTerm: route.query.q }),
  },
  {
    path: "/collection/:id",
    name: "Collection",
    component: Collection,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/webcomponent",
    name: "Web component",
    component: WC,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const quickSearchStore = useQuickSearch()

  quickSearchStore.quickSearchOpen = false

  //if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})

export default router
