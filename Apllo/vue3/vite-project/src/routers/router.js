import MessageTable from '@/modules/message/pages/message.vue';
import Oragnization from '@/modules/oragnization/pages/oragnization.vue'; 

const routes = [
    {
        path: "/",
        redirect: "/message",
    },
    { path: "/message", component: MessageTable, name:"消息管理" },
    { path: "/oragnization", component: Oragnization, name:"组织管理" },
];

export default routes;