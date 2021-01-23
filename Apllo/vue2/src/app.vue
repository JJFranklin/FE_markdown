<template>
<div class="wrapper">
<<<<<<< Updated upstream:Apllo/vue2/src/app.vue
=======
    <menu-group v-if="showMenu" :count="count" :newMenus="newMenus"></menu-group>
>>>>>>> Stashed changes:Apllo/src/app.vue
</div>
</template>

<script>
import Menu from "@components/menu";
export default {
    data(){
        return{
            count:0,
            showMenu:false,
            newMenus:{id:"312",obj:{
                arr:{
                    a:1
                }
            }}
        }   
    },
    methods:{
    },
    computed:{
    },
    watch:{
    },
    mounted(){
        setTimeout(()=>{
            this.showMenu = true;
            this.count = 1;
            this.newMenus.obj.arr.a = 2;
        },1000);
    },
    components:{
    }
}
</script>

<style lang='scss' scoped>

</style>