<template>
<div class="wrapper">
    <group-menu v-if="showMenu"></group-menu>
    <button @click.stop="dismiss">消失</button>
</div>
</template>

<script>
import Menu from "@components/menu";
import axios from "axios";
export default {
    data(){
        return{
            count:0,
            showMenu:true,
            newMenus:{id:"312",obj:{
                arr:{
                    a:1
                }
            }}
        }   
    },
    methods:{
        dismiss(){
            this.showMenu = false;
        }
    },
    computed:{
    },
    watch:{
    },
    mounted(){
        axios.get("/api/cart.json").then(res=>{
            console.log("res",res.data);
        });
    },
    beforeDestroy() {
        console.log("p:disstorye");
    },
    destroyed(){
        console.log("p:destoryed");
    },
    components:{
        "group-menu":Menu
    }
}
</script>

<style lang='scss' scoped>

</style>