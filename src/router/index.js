import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import( '../views/Index.vue')
  },
  {
    path: '/accounting',
    name: 'Accounting',
    component: () => import('../views/options1/Accounting.vue')
  },
  {
    path: '/car',
    name: 'Car',
    component: () => import('../views/options1/Car.vue')
  },
  {
    path: '/options2-1',
    name: 'Options2-1',
    component: () => import('../views/options2/Options2-1.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
