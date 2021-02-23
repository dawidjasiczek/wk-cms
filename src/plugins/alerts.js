import Store from '../store';
export const WKAlerts = {
    install(Vue, options) {
        Vue.prototype.$alert = (options)=>{
            Store.dispatch('addAlert', options)
        }
    }
}