import Axios from "./axios";

const Http = Axios();

export default {
    get(url,params,headers){
        return Http.get(url,{params,headers});
    },
    post(url,params,headers){
        return Http.post(url,params,{headers});
    },
    put(url,params,headers){
        return Http.put(url,params,{headers});
    },
    delete(url,params,header){
        return Http.delete(url,{params,header});
    },
}
