# Alerts

WKCMS ma podpięty moduł komunikatów. Do poprawnego działania wymaga on użycia komponentu **WkViewport**



## Podpięcie

### main.js
W pliku `main.js`
```js
import { WKAlerts } from 'wk-cms/src/plugins/alerts';
Vue.use(WKAlerts);
```

### store

state
```js
alerts: []
```

mutations
```js
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
```

actions
```js
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
```

## Użycie

W dowolnym miejscu w kodzie możemy wywołać

```js
this.$alert({type: 'TYP', msg: "TREŚĆ"})
```
| Nazwa |  Opis | 
|:-:|:-:|
| typ | Kolor alertu. Możliwe: `error`, `success`, `info` |
| msg | Treść alertu |