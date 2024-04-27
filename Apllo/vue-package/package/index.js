import Dialog from './dialog/dialog.vue';
import Modal from './model/modal.vue';

const comps = [Dialog,Modal];

const install = (Vue)=>{
    comps.forEach((com)=>{
        Vue.component(com.name,com);
    });
}

export default install;