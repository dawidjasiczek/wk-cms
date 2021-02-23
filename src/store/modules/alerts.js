import Axios from 'axios';

export const Auth = {
    namespaced: true,
    state: () => ({
        alerts: []
    }),

    mutations: {
        addAlert(state, data){
            state.alerts.push({
                type: data.type,
                msg: data.msg,
                id: data.id
            });
          },
          
          removeAlert(state, id){
              let index = state.alerts.findIndex(i => i.id == id);
              if(index != -1) state.alerts.splice(index, 1);
          }
    },

    

    actions: {
        addAlert({commit}, data){

            const id = 'alert_' + Date.now() + "_" + Math.floor(Math.random() * 10000);
      
            commit('addAlert', {
                ...data,
                id
            });
            
            if(!data.duration || data.duration != -1){
                let dur = 3500;
                if(data.duration) dur = data.duration;
      
                setTimeout(() => {
                    commit('removeAlert', id);
                }, dur);
            }
          }
    }
}