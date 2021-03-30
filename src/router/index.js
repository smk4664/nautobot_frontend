import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'
import Login from '../components/Login.vue'
import DataTable from '../components/DataTable.vue'
import SiteDetail from '../views/SiteDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dcim/sites',
    name: 'Sites',
    component: DataTable
  },
  {
    path: '/dcim/sites/:slug',
    name: 'sitedetail',
    component: SiteDetail
  },
  {
    path: '/ipam/ip-addresses',
    name: 'IPAddresses',
    component: DataTable
  },
  {
    path: '/circuits/providers',
    name: 'Providers',
    component: DataTable
  },
  {
    path: '/circuits/circuits',
    name: 'Circuits',
    component: DataTable
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
