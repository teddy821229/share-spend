import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from './../views/Login.vue'
import store from './../store'

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
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('./../views/Groups.vue')
  },
  {
    path: '/groups/create',
    name: 'create-group',
    component: () => import('./../views/GroupCreate.vue')
  },
  {
    path: '/groups/:id',
    name: 'group',
    component: () => import('./../views/GroupDetail.vue')
  },
  {
    path: '/groups/edit/:id',
    name: 'group-edit',
    // TODO: group edit views
    component: () => import('./../views/GroupDetailEdit.vue')
  },
  {
    path: '/friendship',
    name: 'friendship',
    component: () => import('./../views/Friends.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('./../views/Setting.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  linkActiveClass: 'part-active',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if(currentUser) {
    store.commit('setCurrentUser', currentUser)
  }
  next()
})

export default router
