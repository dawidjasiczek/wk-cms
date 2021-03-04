
export const WKAlerts = {
    install(Vue, config) {
        Vue.prototype.$alert = (options)=>{
            config.store.dispatch('addAlert', options)
        }
    }
}