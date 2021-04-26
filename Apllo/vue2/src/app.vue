<template>
<div class="wrapper">
    <div class="content">
        <product></product>
        <cart></cart>
        <ulli></ulli>
    </div>
</div>
</template>

<script>
import product from '@components/product';
import cart from '@components/cart';
import ulli from "@components/ul-li.vue";
export default {
    data(){
        return{
            
        }   
    },
    methods:{
    },
    computed:{
    },
    watch:{
    },
    mounted(){
     
    },
    components:{
        product,
        cart,
        ulli
    }
}
</script>

<style lang='scss' scoped>
.content{
    margin: 24px auto;
}

</style>