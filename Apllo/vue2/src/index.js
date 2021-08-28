import Vue from 'vue';
import App from './app.vue';
import store from "../store/store";
import {router} from "./router/router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import "@resource/scss/common.scss";
import * as _ from "lodash";
import axios from "axios";
import * as echarts from 'echarts';
Vue.use(ElementUI);

Vue.prototype.$echart = echarts;

Vue.prototype.$http = axios.create({
    baseURL:"http://127.0.0.1:3002/api"
});

Vue.prototype.$bus = new Vue(); // 全局使用事件总线，用于全局信息通信

new Vue({
    el:'#app',
    store,
    router,
    render(h){
        return h(App);
    }
});