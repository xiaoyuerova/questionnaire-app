import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RHome from '../views/respondents/Home.vue'
import QLogin from '../views/questioners/Login.vue'
import QRegister from '../views/questioners/Register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/respondents/:qid',
    name: 'RespondentsHome',
    component: RHome
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/',
    name:'QuestionersLogin',
    component: QLogin
  },
  {
    path:'/register',
    name:'QuestionersRegister',
    component: QRegister
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
