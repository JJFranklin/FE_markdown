import Vue from 'vue';
import App from './app.vue';
import store from "../store/store";
import "@resource/scss/common.scss";
import * as _ from "lodash";

new Vue({
    el:'#app',
    store,
    render(h){
        return h(App);
    }
});