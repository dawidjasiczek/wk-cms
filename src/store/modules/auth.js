import Axios from 'axios';

export const Auth = {
    namespaced: true,
    state: () => ({
        user: null,
        authData: null
    }),

    mutations: {
        setUser: (state, data) => {
            state.user = data;
            if(localStorage) {
                localStorage.setItem('wkcms_username', data.username);
            }
        },
        setAuthData: (state, data) => {
            state.authData = data;
            if(localStorage) {
                localStorage.setItem('wkcms_token', data.token);
                localStorage.setItem('wkcms_expDate', data.expDate);
                localStorage.setItem('wkcms_role', data.userRole);
            }
             Axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('wkcms_token');
                Axios.defaults.headers.common['X-Authorization'] = "Bearer " + localStorage.getItem('wkcms_token');
        },
        unsetUser(state) {
            state.user = null;
            if(localStorage) {
                localStorage.removeItem('wkcms_username');
            }
            
        },
        unsetAuthData(state) {
            state.authData = null;
            if(localStorage) {
                localStorage.removeItem('wkcms_token');
                localStorage.removeItem('wkcms_expDate');
                localStorage.removeItem('wkcms_role');
            }
             Axios.defaults.headers.common['Authorization'] = "";
            Axios.defaults.headers.common['X-Authorization'] = "";
        }
    },

    getters: {
        isLoggedIn: (state) => {
            return state.user != null;
        },
        userName: (state) => {
            return (state.user == null ? '' : state.user.username);
        },
        userInitials: (state) => {
            if(state.user == null) {
                return 'WK';
            }

            let initials = state.user.username.split(" ");

            if(initials.length == 1) {
                return initials[0].substring(0, 2).toUpperCase();
            } else {
                return initials[0].substring(0,1).toUpperCase() + initials[1].substring(0,1).toUpperCase();
            }
        },
        userRole: (state) => {
            if(state.authData == null) {
                return '';
            }

            return state.authData.userRole;
        }
    },

    actions: {
        loginFromStorage: ({commit}) => {
            if (localStorage.getItem('wkcms_token') && localStorage.getItem('wkcms_expDate')) {
              let d = new Date(parseInt(localStorage.getItem('wkcms_expDate')));
      
              if (d.getTime() > Date.now()) {
                commit('setUser', {
                    username: localStorage.getItem('wkcms_username')
                });
                commit('setAuthData', {
                    token: localStorage.getItem('wkcms_token'),
                    expDate:localStorage.getItem('wkcms_expDate'),
                    userRole:localStorage.getItem('wkcms_role')
                })


               
                return true;
      
              } else {
                commit('unsetUser');
                commit('unsetAuthData');
                return false;
              }
            } else {
                return false;
            }
          },
          logout: ({commit}) => {
            commit('unsetUser');
            commit('unsetAuthData');
           
          }
    }
}