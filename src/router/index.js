import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout-default',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/login.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('../views/signin.vue')
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('../views/me.vue')
      },
      {
        path: 'add-salon',
        name: 'add-salon',
        component: () => import('../views/add-salon.vue')
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
