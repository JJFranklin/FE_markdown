<template>
<div class="wrapper">
    <menu-group v-if="showMenu" :count="count" :newMenus="newMenus"></menu-group>
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
        "menu-group":Menu
    }
}
</script>

<style lang='scss' scoped>

</style>