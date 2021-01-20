import Vue from 'vue';
import App from './app.vue';

import "@resource/scss/common.scss";

new Vue({
    el:'#app',
    render(h){
        return h(App);
    }
});