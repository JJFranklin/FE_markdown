import axios from "axios";

const instance = axios.create({
    baseURL: "/api", // api的base_url
    timeout: 600000, // 请求超时时间
    // headers: {
    // "Access-Control-Allow-Credentials": true
    // }, // 请求头信息
    withCredentials: false, // 跨域请求时是否需要使用凭证，默认 false
    responseType: "json", 
});

instance.interceptors.request.use((config)=>{
    return config;
},(error)=>{
    console.log(error);
    return error;
});


instance.interceptors.response.use((res)=>{
    if(res.resultCode ===  200){
        return res;
    } else {
        return {...res};
    }
},(error)=>{
    return Promise.reject(error);
});

export default ()=>instance;
