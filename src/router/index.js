import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from './../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'root',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('./../views/Payment.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
