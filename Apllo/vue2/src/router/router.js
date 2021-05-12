import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@components/home";
import Shop from "@components/shop/index";
import About from "@components/about";
import AboutChild from  "@components/aboutchild";
import Chart from "@components/chart";


Vue.use(VueRouter);
/**
 * 路由分为三部分
 * 1、home 主页
 * 2、shop 商店
 * 3、about 关于我们
 */

const routes = [
    {
        path:"/",
        name:"",
        redirect:"/home"
    },
    {
        path:"/home",
        name:"Home",
        component:Home
    },
    {
        path:"/shop",
        name:"Shop",
        component:Shop
    },
    {
        path:"/about",
        name:"About",
        component:About,
        children:[
            {
                path:"child",
                name:"aboutchild",
                component:AboutChild
            }
        ]
    },
    {
        path:"/chart",
        name:"Chart",
        component:Chart
    }
];


const router = new VueRouter({
    routes
});

router.beforeEach((to,from,next)=>{
});


export {router,routes};