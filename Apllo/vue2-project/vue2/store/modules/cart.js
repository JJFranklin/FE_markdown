/**
 * 设计购物车数据模型
 * 1、展示商品名称，数量，总价，总数量
 * 2、减少商品数量，降到0就移除该商品
 */

 export default {
    state:{
        carts:[
            // {
            //     "prodId":"1", // 商品id 和产品中的商品id 一致
            //     "count":2 // 商品数量
            // },
            // {
            //     "prodId":"2", // 商品id 和产品中的商品id 一致
            //     "count":10 // 商品数量
            // }
        ],
    },
    // 对state 进行进一步加工，联合其他的store中数据，组合成新的数据
    getters:{
        carts(state,getter,rootState){
            let carts =  _.cloneDeep(state.carts);
            let products = rootState.product.products;
            let copyCarts = [];
            products.map(item=>{
                let prodId = item.prodId;
                let prodName = item.name;
                carts.filter(cart=>{
                    if(prodId == cart.prodId){
                        cart.name = prodName;
                        cart.price = item.price;
                        copyCarts.push(cart);
                    }
                });
            });
            return copyCarts;
        },
        totalCount(state){
            return state.carts.reduce((total,item)=>{
                return total += item.count;
            },0);
        },
        totalPrice(state,getters){
            return getters.carts.reduce((total,item)=>{
               return total += item.price*item.count;
            },0);
        }
    },
    mutations:{
        updateCarts(state,prodId){
            let cart = state.carts.find((item,index)=>{
               if(prodId == item.prodId){
                   item.count++;
                   return item;
               };
            });
            if(!cart){
                state.carts.push({
                    prodId:prodId,
                    count:1
                });
            }
        },
        delProdInCart(state,prodId){
            state.carts = state.carts.filter(item=>{
                if(prodId == item.prodId && item.count>0){
                    item.count--;
                };
                return item.count>0;
            });
        }
    },
    
    actions:{
        updateCarts({commit},prodId){
            commit('updateCarts',prodId);
        },
        delProdInCart({commit},prodId){
            commit('delProdInCart',prodId);
        }
    }
 }
