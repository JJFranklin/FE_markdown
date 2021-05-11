<template>
<div class="cart" v-if="carts.length >0">
    <p>购物车列表</p>
    <div class="cart-item" v-for="(item,index) in carts" :key="item.productId">
        <div v-show="index==0"><span>商品名称</span><span>数量</span></div>
        <div v-if="item.count>0"><span>{{item.name}}</span><span>{{item.count}}</span><button @click.stop="delProduct(item)">减少</button></div>
    </div>
    <p>总价：{{totalPrice}} 元</p>
    <p>总数量：{{totalCount}}</p>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    name: '',
    props: {},
    data() {
        return {
            cartName:"",
        }
    },
    computed:{
        ...mapGetters(['carts','totalPrice','totalCount']),
    },
    watch: {},
    methods: {
        // 删除购物车中的产品
        delProduct(item){
            this.delProdInCart(item.prodId);
        },
        ...mapActions(['delProdInCart']),
    },
    created(){
        this.$bus.$on("getProductName",(res)=>{
            this.cartName = res;
        });
    },
    mounted(){
        
    },
    beforeDestroy(){
        this.$bus.$off("getProductName");
    },
    components: {
        
    }
}
</script>

<style lang='scss' scoped>
.cart{
    // border-bottom: 1px solid #f2f3f4;
    &-item{
        margin-bottom: 8px;
        &>div{
            margin-bottom: 8px;
        }
        span{
            margin-right: 24px;
            min-width:120px;
            display: inline-block;
        }
    }
}
</style>
