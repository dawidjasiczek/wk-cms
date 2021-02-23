import axios from 'axios';
import Store from '../store';
import { Axios as AxiosConfig } from '../config';
axios.defaults.baseURL = AxiosConfig.baseUrl;
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const e_conf = error.config;
    if (error.response) {
        if(error.response.status == 404){
            Store.dispatch('addAlert', { type: 'error', msg:Store.state.messages.Axios.e404});
        }
        else{
            if(AxiosConfig.errorsInBack === true){
                Store.dispatch('addAlert', 
                { type: 'error', msg: error.response.data.msg});
            }else{
                //próba wyświetlenia errora z messages
                let url_to_split = null;
                let message = null;
                if(e_conf.url.startsWith('http://') || e_conf.url.startsWith('https://')){
                    //podano na wejście axiosowi absolutny URL
                    url_to_split = e_conf.url;
                    //wycinamy z przodu http(s) i dzielimy po '/'
                    url_to_split = url_to_split.split("://");
                    url_to_split.shift();
                    if(url_to_split.length == 1){
                        //jezeli długość 1 to gitt, inaczej błądny URL
                        url_to_split = url_to_split[0];
                        url_to_split = url_to_split.split("/");
                        for(let i = 0; i < url_to_split.length; i++){
                            if(url_to_split[i] == AxiosConfig.urlPrefix && i < url_to_split.length - 1){
                                if(Store.state.messages.Axios[url_to_split[i + 1]]){
                                    // console.log(url_to_split[i + 1])
                                    message = Store.state.messages.Axios[url_to_split[i + 1]]["e"+error.response.data.error_code];
                                }
                                break;
                            }
                        }
                    }
                }
                else{
                    //na wejście dostał relatywa i kleił z base - base prefix sprawdzamy z ostatniego elementu baseURL, a message key bierzemy z pierwszego elementu URL
                    if(e_conf.baseURL.endsWith('/' + AxiosConfig.urlPrefix)){
                        const group = e_conf.url.split('/')[1];
                        if(Store.state.messages.Axios[group]){
                            message = Store.state.messages.Axios[group]["e"+error.response.data.error_code];
                        }
                    }
                }

                if(message !== null && message !== undefined){
                    Store.dispatch('addAlert', { type: 'error', msg:message});
                }else{
                    Store.dispatch('addAlert', { type: 'error', msg:Store.state.messages.Axios.server_error});
                }
            }
        }
    } else if (error.request) {
        Store.dispatch('addAlert', { type: 'error', msg: Store.state.messages.Axios.e404});
    } else {
        Store.dispatch('addAlert', { type: 'error', msg: Store.state.messages.Axios.server_error});
    }
    return Promise.reject(error);
  });
function callAxios(config){
    return new Promise(async (res, rej) => {
        try{
            res((await axios(config)).data);
        }
        catch(err){
            rej(err);
        }
    });
}
export const WKAxios = {
    install(Vue, options) {
        Vue.prototype.$axios = {
            $get(url, config){
                return callAxios({
                    url,
                    config,
                    method: 'get'
                });
            },
            $post(url, data, config){
                return callAxios({
                    method: 'post',
                    url,
                    data,
                    ...config
                })
            },
            $put(url, data, config){
                return callAxios({
                    method: 'put',
                    url,
                    data,
                    ...config
                })
            },
            $patch(url, data, config){
                return callAxios({
                    method: 'patch',
                    url,
                    data,
                    ...config
                })
            },
            $delete(url, data, config){
                return callAxios({
                    method: 'delete',
                    url,
                    data,
                    ...config
                })
            }
        }
    }
}