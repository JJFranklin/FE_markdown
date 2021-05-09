<template>
<div class="wrapper">
    <div class="content">
        <product></product>
        <cart></cart>
    </div>
</div>
</template>

<script>
import product from '@components/product';
import cart from '@components/cart';
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
    }
}
</script>

<style lang='scss' scoped>
.content{
    margin: 24px auto;
}

</style>