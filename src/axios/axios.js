import axios from 'axios';

let Store = null

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

        axios.defaults.baseURL = options.config.baseUrl;

        if(options.store) Store = options.store;

        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            const e_conf = error.config;
            if (error.response) {
                //e404
                if(error.response.status == 404){
                    if(Store !== null){
                        if(Store && Store.state  && Store.state.messages && Store.state.messages.Axios && Store.state.messages.Axios.e404){
                            Store.dispatch('addAlert', {
                                type: 'error', 
                                msg: Store.state.messages.Axios.e404
                            });
                        }else{
                            Store.dispatch('addAlert', {
                                type: 'error', 
                                msg: 'Request failed with status code 404'
                            });
                        }
                        
                    }
                    else{
                        console.error('[WkAxios] Request failed with status code 404:');
                        console.error(error.response);
                    }
                }
                else{
                    if(options.config.displayErrorsFromResponse === true){
                        if(Store !== null){
                            if(error && error.response && error.response.data && error.response.data.msg){
                                Store.dispatch('addAlert', {
                                    type: 'error', 
                                    msg: error.response.data.msg
                                });
                            }else{
                                Store.dispatch('addAlert', {
                                    type: 'error', 
                                    msg:'Error message was not provided'
                                });
                            }
                           
                        }
                        else{
                            console.error('[WkAxios] Request failed with message:');
                            if(error && error.response && error.response.data && error.response.data.msg){
                                console.error(error.response.data.msg)
                            }else{
                                console.error('Error message was not provided');
                            }
                        }
                    }else{
                        if(Store !== null){
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
                                        if(url_to_split[i] == options.config.urlPrefix && i < url_to_split.length - 1){
                                            if(Store && Store.state && Store.state.messages && Store.state.messages.Axios[url_to_split[i + 1]]){
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
                                if(e_conf.baseURL.endsWith('/' + options.config.urlPrefix)){
                                    const group = e_conf.url.split('/')[1];
                                    if(Store && Store.state && Store.state.messages && Store.state.messages.Axios[group]){
                                        message = Store.state.messages.Axios[group]["e"+error.response.data.error_code];
                                    }
                                }
                            }

                            if(message !== null && message !== undefined){
                                Store.dispatch('addAlert', { type: 'error', msg: message});
                            }else{
                                if(Store && Store.state && Store.state.messages && Store.state.messages.Axios && Store.state.messages.Axios.server_error){
                                    Store.dispatch('addAlert', { type: 'error', msg: Store.state.messages.Axios.server_error});
                                }else{
                                    Store.dispatch('addAlert', { type: 'error', msg: 'Unknown server error'});
                                }
                            }
                        }
                        else{
                            console.error('[WkAxios] Request failed but no message was provided');
                        }
                    }
                }
            } else if (error.request) {
                if(Store !== null){
                    if(Store && Store.state && Store.state.messages && Store.state.messages.Axios && Store.state.messages.Axios.e404){
                        Store.dispatch('addAlert', { type: 'error', msg: Store.state.messages.Axios.e404});
                    }else{
                        Store.dispatch('addAlert', { type: 'error', msg:  'Could not connect to the server'});
                    }
                    
                }
                else{
                    console.error('[WkAxios] Could not connect to the server');
                }
            } else {
                if(Store !== null){
                    if(Store && Store.state && Store.state.messages && Store.state.messages.Axios && Store.state.messages.Axios.server_error){
                        Store.dispatch('addAlert', { type: 'error', msg: Store.state.messages.Axios.server_error});
                    }else{
                        Store.dispatch('addAlert', { type: 'error', msg: 'Unknown server error'});
                    }
                }
                else{
                    console.error('[WkAxios] Unknown server error');
                }
            }
            return Promise.reject(error);
        });
    }
}