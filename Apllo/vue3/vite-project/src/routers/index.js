import {createRouter,createWebHashHistory,createWebHistory} from "vue-router";
import routes from "./router.js";

const routers = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default routers;