import Vue from 'vue';
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import EcahrtMap from './echartmap.vue';
import * as echarts from 'echarts';



Vue.use(ElementUI);
Vue.prototype.$echart = echarts;

new Vue({
    el:'#echartmap',
    render(h){
        return h(EcahrtMap);
    }
});