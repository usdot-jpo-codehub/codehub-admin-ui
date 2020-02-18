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
  },
  {
    path: '/categories',
    components: { default: () => import('../views/categories.vue')},
    children: [
      {
        path: '',
        name: 'categories-home',
        components: { categories: () => import('../views/categories/categories_home.vue')}
      },
      {
        path: '/categories/add',
        name: 'categories-add',
        components: { categories: () => import('../views/categories/categories_add.vue')}
      },
      {
        path: '/categories/remove',
        name: 'categories-remove',
        components: { categories: () => import('../views/categories/categories_remove.vue')}
      },
      {
        path: '/categories/update',
        name: 'categories-update',
        components: { categories: () => import('../views/categories/categories_update.vue')}
      }
    ]
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
