<template>
<div class="product">
    <p>商品列表</p>
    <div class="product-item" v-for="(item,index) in products" :key="item.productId">
        <div v-show="index==0"><span>商品名称</span><span>价格</span></div>
        <span>{{item.name}}</span><span>{{item.price}}</span><button @click.stop="addToCart(item)">添加到购物车</button>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    name: '',
    props: {
        printlog:{
            default:function(){},
            type:Function,
        }
    },
    data() {
        return {
        }
    },
    computed:{
        ...mapGetters('product',['products']),
    },
    watch: {},
    methods: {
        // 添加商品到购物车
        addToCart(item){
            this.updateCarts(item.prodId);
        },
        ...mapActions('product',['getProductInfo']),
        ...mapActions(['updateCarts'])
    },
    mounted(){
        this.getProductInfo();
    },
    components: {
        
    }
}
</script>

<style lang='scss' scoped>
.product{
    border-bottom: 1px solid #f2f3f4;
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
