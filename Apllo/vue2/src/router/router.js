import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@components/home";
import Shop from "@components/shop/index";
import About from "@components/about";


Vue.use(VueRouter);
/**
 * 路由分为三部分
 * 1、home 主页
 * 2、shop 商店
 * 3、about 关于我们
 */

const routes = [
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
        component:About
    }
];


const router = new VueRouter({
    routes
});

router.push({name:"Home"});

export {router,routes};