### Podpięcie logowania

!> Wymaga podpięcia modułu (auth)[/plugins/auth/] ze store.
!> Wymaga podpięcia modułu (alerts)[/plugins/alerts/] ze store.

We Viewsie odpowiedzialnym za logowanie wywołujemy 
```
<WkLoginView logo="/static/img/logo.png" appName="Czas Na Deser"></WkLoginView>
```

##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| logo | `String` | Adres do logo. Uwaga, dobrze podać ścieżkę która będzie działała na serwerze produkcyjnym a nie devowym |
| appName | `String` | Wyświetlana nazwa aplikacji |
| lang | `String` | Język. W przypadku innym niż `pl` wyświetla wersję angielską. Default: `pl` |
| loginRoute | `String` | Adres na który axios wyśle żądanie logowania. Default: `/auth/login` |
| afterLoginRoute | `String` | Adres na który zostaniemy przekierowani po zalogowaniu. Default: `/admin` |



##### Przykładowe logowanie w WK-TAMER
```php

    namespace Tamer\Routing;

    class Controller {

        public function login($req, $res){
            //kapelusze, gzBMEKwnFTRubtBAuhDhjRKC                                                                
            if(!$req->inBody(['login', 'password'])){
                return $res->json([
                    'success' => false,
                    'msg' => 'Niepełne dane wejściowe'
                ], 400);
            }
            $DB = new \Tamer\Modules\Database();
            $p = new \Tamer\Modules\Password();

            $user = $DB->select("SELECT * FROM users LIMIT 1");

            if(!$user || !$p->verify($req->body['password'], $user['password'])){
                return $res->json([
                    'success' => false,
                    'msg' => 'Nieprawidłowy login lub hasło'
                ], 400);
            }

            $JWT = new \Tamer\Modules\JWTFactory;

            $token = $JWT->getToken(\strtotime('tomorrow midnight'), [
                'userID' => $user['id']
            ]);

            $res->json([
                'success' => true,
                'data' => [
                    'token' => $token['token'],
                    'token_exp_date' => strtotime($token['expDate']) * 1000,
                    'user' => [
                        'role' => 'admin',
                        'username' => $user['name']
                    ]
                ]
            ]);            
        }
    }

```