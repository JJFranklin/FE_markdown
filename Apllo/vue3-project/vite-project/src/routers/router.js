// import MessageTable from '@/modules/message/pages/message.vue';
// import Oragnization from '@/modules/oragnization/pages/oragnization.vue'; 

const routes = [
    {
        path: "/",
        redirect: "/message",
    },
    { path: "/message", component: ()=>import('@/modules/message/pages/message.vue'), name:"消息管理" },
    { path: "/oragnization", component: ()=>import('@/modules/oragnization/pages/oragnization.vue'), name:"组织管理" },
    { path: "/map", component: ()=>import('@/modules/custom-map/pages/custom-map.vue'), name:"地图" },
    { path: "/practice", component: ()=>import('@/modules/practice/pages/index.vue'), name:"练习" },
];

export default routes;