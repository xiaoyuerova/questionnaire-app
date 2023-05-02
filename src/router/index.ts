import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import RHome from '../views/respondents/Home.vue'
import QLogin from '../views/questioners/Login.vue'
import QRegister from '../views/questioners/Register.vue'
import RLogin from '@/views/respondents/Login.vue'

import SpecialRouter from './modules/special'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    // {
    //     path: '/',
    //     name: 'QuestionersLogin',
    //     component: QLogin
    // },
    {
        path: '/',
        redirect: { name: 'specialHome'}
    },
    {
        path: '/respondents/login/:qid',
        name: 'RespondentsLogin',
        component: RLogin
    },
    {
        path: '/respondents',     /*qid: questionnaireId; rid: respondentId */
        name: 'RespondentsHome',
        component: RHome
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'QuestionersRegister',
        component: QRegister
    },
    {
        path: '/questioners/index',
        name: 'Questioner',
        component: () => import('@/views/questioners/Questioner.vue')
    },
    {
        path: '/summer/login',
        name: 'summerLogin',
        component: () => import('../views/summer/Login.vue')
    },
    {
        path: '/summer/:qid',
        name: 'summerHome',
        component: () => import('../views/summer/Home.vue')
    },
    {
        path: '/paper',
        name: 'paper',
        component: () => import('../views/paper/paper.vue')
    },
    {
        path: '/paper/admin',
        name: 'paperAdmin',
        component: () => import('../views/paper/admin.vue')
    },
    {
        path: '/special',
        component: () => import('../views/special/Layout.vue'),
        children: SpecialRouter
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
