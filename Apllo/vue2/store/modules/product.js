/**
 * 商品模型
 * 功能
 * 1、展示商品信息 名称，价格
 * 2、能够添加到购物车
 * */ 
import axios from "axios";
export default {
    namespaced: true,
    state:{
        products:[
            // {
            //     "prodId":"1", //商品Id
            //     "name":"手机", //商品名称
            //     "price":100   //商品价格
            // }
        ]
    },
    getters:{
        products(state){
            return state.products;
        }
    },
    mutations:{
        getProductInfo(state,data){
            state.products = data;
        },
    },
    actions:{
        // 获得产品信息
        getProductInfo({commit}){
            axios.get("/api/product.json").then(res=>{
                if(200 === res.status){
                    commit("getProductInfo",res.data);
                }
            });
            
        },
    }
 }