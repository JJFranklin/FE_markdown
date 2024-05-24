import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
/**
 * 路由分为三部分
 * 1、home 主页
 * 2、shop 商店
 * 3、about 关于我们
 * 4、chart 图表展示
 * 5、component 组件 
 * 5.1、infinityscroll 无限滚动 
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
        // component:()=>import("../components/home")
        component:(resolve) => require.ensure([], () => resolve(require('../components/home'))),
    },
    {
        path:"/shop",
        name:"Shop",
        // component:()=>import("../components/Shop")
        component:(resolve) => require.ensure([], () => resolve(require('../components/home'))),
    },
    {
        path:"/about",
        name:"About",
        // component:()=>import("../components/About"),
        component:(resolve) => require.ensure([], () => resolve(require('../components/About'))),

        children:[
            {
                path:"child",
                name:"aboutchild",
                // component:()=>import("../components/AboutChild")
                component:(resolve) => require.ensure([], () => resolve(require('../components/AboutChild'))),

            }
        ]
    },
    {
        path:"/chart",
        name:"Chart",
        // component:()=>import("../components/Chart")
        component:(resolve) => require.ensure([], () => resolve(require('../components/Chart'))),
    },
    {
        path:"/basecomponents",
        name:"basecomponents",
        children:[
            {
                path:"infinityscroll1",
                name:"infinityscroll1",
                // component:()=>import("../components/basecomponts/infinityscroll1")  
                component:(resolve) => require.ensure([], () => resolve(require('../components/basecomponts/infinityscroll1'))),
  
            },
            {
                path:"infinityscroll2",
                name:"infinityscroll2",
                // component:()=>import("../components/basecomponts/infinityscroll2") 
                component:(resolve) => require.ensure([], () => resolve(require('../components/basecomponts/infinityscroll2'))),
            },
        ],
        // component:()=>import("../components/basecomponts/index")
        component:(resolve) => require.ensure([], () => resolve(require('../components/basecomponts/index'))),
    }
];


const router = new VueRouter({
    routes
});




export {router,routes};