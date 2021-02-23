# Axios

## Plik config

W folderze `config` głównego folderu projektu musimy utworzyć plik `axios.config.js` o takiej zawartości:

```js
export default {
    baseUrl: '/api',
    displayErrorsFromResponse : true,
    urlPrefix: 'api'
}
```
| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| baseUrl | `String` | Adres pod którym znajduje się główny folder api |
| displayErrorsFromResponse | `Boolean` | Sprawia, że Axios zamiast pobierać error messages z Stora, wyświetla error z odpowiedzi HTTP - dokładniej z właściwości `msg` obiektu odpowiedzi. |


## Podpięcie

W pliku `main.js`
```js
import { WKAxios } from 'wk-cms/src/axios/axios.js'
import axiosOptions from 'wk-cms/src/config/axios.config.js'
Vue.use(WKAxios, {
  config: axiosOptions,
  store
})
```

Od teraz mamy dostęp do modułu axiosa w naszej aplikacji. 

## Rządania

Rządania robimy asynchroniczne. Budowa rządania:

```js
await this.$axios.$method(url, data, config)
```
Gdzie

| Nazwa |  Opis | 
|:-:|:-:|
| method | Metoda której chcemy użyć. Możliwe: `$get`, `$post`, `$put`, `$patch`, `$delete` |
| url | Adres na który ma pójśc rządanie. <br> **Uwaga** Należy pamiętać, że scieżkę pojdajemy od momentu określonego w baseUrl pliku config. <br>Przykład: Chcąc zrobić rządanie na adres  `/api/test` gdy mamy w pliku config `baseUrl: '/api'`, wpiszemy tutaj tylko `/test` |
| data | Obiekt z danymi |
| config | Obiekt konfiguracyjny. Jest on wypakowywany do rządania.  |

Przykładowe rządania:

##### GET
```js
let r = await this.$axios.$get(`/blog-posts/?p=${this.page}&s=${this.searchString}`);
```
##### POST
```js
let r = await this.$axios.$post('/blog-posts/', formData, {
    headers: {
        "Content-Type": 'multipart/form-data'
    }
});
```
##### PUT
```js
let r = await this.$axios.$put('/blog-posts/'+id+'/changeState',{
    newState: 1
});
```
##### DELETE
```js
let r = await this.$axios.$delete('/blog-posts/'+id);
```

## Alerts Messages

Jeżeli **nie** korzystamy z trybu *displayErrorsFromResponse*, musimy mieć skonfigurowane store [zobacz jak](#) oraz dobrze aby  mieć podpięty moduł [alerts](/plugins/alerts/).

Plik messages powinien wyglądać tak: 
```js
export const Messages = {
    state: () => ({ 

        Axios: {
            server_error: 'Nieoczekiwany bład serwera',
            e404: 'Błąd połączenia z serwerem',
            'orders': {
                e7: 'kod e7 axiosa'
            }
        }
    }),
    mutations: {  },
    actions: {  },
    getters: {  }
}
```
powinniśmy go podpiąć jako moduł do store pod nazwą `messages`

Gdzie pierwsze 2 (`server_error` oraz `e404` to wymagane kody modułu axiosa) a następnie sami budujemy obiekt posiadający error code. W tym przypadku, budowa wygląda tak:
```
{
    '%prefix': {
        e%KOD%: "%Treść%"
    }
}
```
Gdzie 
**%prefix%** to prefix naszego adresu ( w przykładzie powyżej jest to 'orders'. Te kody wywołają się przy przejściu na `/api/orders` (Zakładająć, że naszym BaseUrl jest `/api`)).<br>
**%KOD%** to kod błędu przesyłany przez serwer pod nazwą  `error_code`. Literka `e` to wymagany prefix <br>
**%Treśc%** To treść naszego błędu.

W przykładzie powyżej, kiedy spróbujemy wykonać akcję na adresie ```/api/orders``` a w odpowiedzi od serwera otrzymamy status `400`, `404` lub `500` wywoła się błąd axiosa. W przypadku podpięcia modułu [alerts](/plugins/alerts/), axios z niego korzysta.