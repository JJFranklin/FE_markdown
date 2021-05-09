import Vue from 'vue';
import App from './app.vue';
import store from "../store/store";
import "@resource/scss/common.scss";
import * as _ from "lodash";

Vue.prototype.$bus = new Vue(); // 全局使用事件总线，用于全局信息通信

new Vue({
    el:'#app',
    store,
    render(h){
        return h(App);
    }
});