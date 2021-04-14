import Vue from 'vue';
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import EcahrtMap from './echartmap.vue';

Vue.use(ElementUI);


new Vue({
    el:'#echartmap',
    render(h){
        return h(EcahrtMap);
    }
});