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
    path: '/options1-1',
    name: 'Options1-1',
    component: () => import('../views/options1/Options1-1.vue')
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
