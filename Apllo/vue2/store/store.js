import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product";
import cart from "./modules/cart.js"

Vue.use(Vuex);


const store = new Vuex.Store(
    {
        // strict:true,
        modules:{
            product,
            cart
        }
    }   
)

export default store;


