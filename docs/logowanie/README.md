### Podpięcie logowania

!> Wymaga podpięcia modułu (auth)[/plugins/auth/] ze store.

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
