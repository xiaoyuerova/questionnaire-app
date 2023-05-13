import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [
    {
        path: '',
        name: 'specialHome',
        component:()=>import("@/views/special/Home.vue"),
    },
    {
        path: 'result',
        name: 'specialResult',
        component:()=>import("@/views/special/Result.vue"),
    },
    // {
    //     path: 'thankyou',
    //     name: 'specialThankyou',
    //     component:()=>import("@/views/special/ThankYou.vue"),
    // },
    {
        path: 'admin',
        name: 'specialAdmin',
        component:()=>import("@/views/special/admin.vue"),
    }
]

export default routes