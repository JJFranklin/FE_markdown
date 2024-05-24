import Http from '@/service/index.js';


const urls = {
    messageUrl: '',

};

const messageSrv = {
    getMessage(url,params = {}){
        return Http.get(urls.messageUrl,params);
    }
}


