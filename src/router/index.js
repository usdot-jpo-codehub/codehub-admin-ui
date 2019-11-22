import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/remove',
    name: 'remove',
    component: () => import('../views/Remove.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('../views/Update.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('../views/Reset.vue')
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
