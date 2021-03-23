## Button

<img src="./images/button.png"  style="display: block">

##### Użycie 
```
<WkButton tag="a" color='primary' href="/admin" >Guzik typu A</WkButton>
<WkButton  color='secondary'>Guzik typu Button</WkButton>
<WkButton  color='success'>Ładowanie</WkButton>
<WkButton  color="danger" type='plain'>Plain danger button</WkButton>
<WkButton  classes="btn--info btn--ucase">Custom classes</WkButton>
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| tag | `String` | Tag HTML jako który ma się pojawić guzik. Default: 'button' |
| type | `String` | Typ guzika. Default: ` `. Możliwe: ` `, `plain` |
| color | `String` | Kolor guzika. Default: ` `. Możliwe: ` `, `danger`, `success`, `info`, `primary`, `white`, `secondary` |
| size | `String` | Rozmiar guzika. Default: ` `. Możliwe: ` `, `xs`, `sm`, `lg`, `fw`|
| classes | `String` | Customowe klasy jakie można nadać guzikowi |
| disabled | `Boolean` | Flaga ustawiająca guzik w tryb disabled |
| loading | `Boolean` | Flaga odpowiadająca za widoczność ładowania |

!> Customowe klasy zalecamy zobaczyć w scss (_wk-button.scss). Możliwości (wszystkie z przyrostkiem `btn--`): `icon`, `flex`, `light`, `fw`, `ucase`

## Tag

<img src="./images/tag.png"  style="display: block">

##### Użycie 
```
<WkTag type="primary">Tag1</WkTag>
<WkTag size="lg">Tag2</WkTag>
<WkTag type="info" size="sm">Tag3</WkTag>
<WkTag type="success">Tag4</WkTag>
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| type | `String` | Kolor taga. Default: `gray`. Możliwe: `gray`, `info`, `danger`, `success`, `primary`, `secondary` |
| size | `String` | Rozmiar taga. Default: ` `, Możliwe: `sm`, `lg`, ` ` |

## Modal

<img src="./images/modal.png"  style="display: block">

##### Użycie 
```
<WkModal show='true' >
    <h2>Zawartość modala</h2>
    <p>Treść modala</p>
</WkModal>
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| show | `Boolean` | Flaga odpowiadająca za widoczność modala |
| confirmButtonText | `String` | Tekst wyświetlony na guziku potwierdzenia. Default `Tak` |
| confirmButtonType | `String` | Kolor guzika zatwierdzenie. Default: `danger`.  Możliwe: `info`, `danger`, `success`, `primary`, `secondary` |
| cancelButtonText | `String` | Tekst wyświetlony na guziku anulowania. Default `Anuluj` |
| loading | `Boolean` | Flaga włączająca loading na guzikach |
| enableClickOutside | `Boolean` | Pozwala zamknąć modal klikając dookoła. Default: `false` |
| size | `String` | Szerokość modala. Default: `normal`, Możliwe: `normal`, `big`, `full` |

##### Emity

| Nazwa |  Opis | 
|:-:|:-:|
| cancel | Emitowana w przypadku kliknięcia guzika `cancel` |
| confirm | Emitowana w przypadku kliknięcia guzika `confirm` |

## Messagebox

Modal wywoływany z kodu
<img src="./images/messagebox.png"  style="display: block">


##### Użycie 
W dowolnym miejscu w kodzie  wywołujemy

```js
this.$messageBox({
    confirmButtonText: 'Usuń',
    confirmButtonType: 'danger',
    cancelButtonText: 'Anuluj',
    text: 'Czy chcesz usunąć?',
    showInput: true,
    inputLabel: 'Wpisz hasło',
    inputMsg: 'Wpisz poprawne hasło',
})
.then(s => {
    console.log(s) // Tu mamy dostępną wartość z inputa
    console.log('confirmed')
})
.catch(e => {
    console.log('canceled')
})
```

##### Obiekt konfiguracji

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| text | `String` | Tekst modala. Default `Default Message Box Text` |
| confirmButtonText | `String` | Tekst wyświetlony na guziku potwierdzenia. Default `Tak` |
| confirmButtonType | `String` | Kolor guzika zatwierdzenie. Default: `success`.  Możliwe: `info`, `danger`, `success`, `primary`, `secondary` |
| cancelButtonText | `String` | Tekst wyświetlony na guziku anulowania. Default `Anuluj` |
| showInput | `Boolean` | Flaga informująca czy ma pokazać input (Który jest wymagany). Default `false` |
| inputLabel | `String` | Label inputa. Default `Default Input Label` |
| inputMsg | `String` | Wiadomość przy braku wypełnienia inputa. Default `Default Input Error Msg` |



## Tabs

<img src="./images/tabs.png"  style="display: block">

##### Użycie 
```
-WkTabs
---WkTabsPane
------Content
---WkTabsPane
------Content
....
---WkTabsPane
------Content

```
```
<WkTabs v-model="activeTab" >
    <WkTabsPane  label="Zakładka 1" name="Nazwa1" key="1">
            <template>
                Zawartość zakładki 1
            </template>
    </WkTabsPane>
    <WkTabsPane  label="Zakładka 2" name="Nazwa2" key="2">
            <template>
                Zawartość zakładki 2
            </template>
    </WkTabsPane>
</WkTabs>
```
##### Props (WkTabsPane)

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| label | `String` | Nagłówek zakładki |
| name | `String` | Nazwa zakładki (musi być unikatowa w obrębie tabsów) |

!> Pod v-modelem typu string komponentu **WkTabs** będziemy mieli obecną nazwę. Jest on **obowiązkowy**


## Table

<img src="./images/table.png"  style="display: block">

##### Użycie 

Zwykła tabela

```
<WkTable
    :data="tableData"
    row-key-prop="_id"
    noData="Brak danych do wyświetlenia."
    :pagination-page="2"
    :pagination-pages="10"
    @pagination-page-select="paginate"
    enablePagination
>
    <template v-slot="scope">
        <WkTableCol
            label="#"
            width="60"
            text-align="center"
        >
            <div class="text--bold">
                {{ scope.index }}
            </div>
        </WkTableCol>
        <WkTableCol label="Nazwa">
            <div class="text--bold">
                {{ scope.row.name }}
                
            </div>
        </WkTableCol>
        <WkTableCol label="Opis">
            {{scope.row.desc}}
        </WkTableCol>
    </template>
</WkTable>
```

##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| loading| `Boolean` | Odpowiada za wyświetlenie animacji ładowania tabelki. Default: `false` |
| expandable | `Boolean` | Informacja, że tabela jest rozwijana (rzędami). Zobacz schemat poniżej. Default: `false` |
| animated | `Boolean` | Czy tabela ma być animowana. Default: `true` |
| enablePagination | `Boolean` | Czy używać na stronie klasycznej paginacji (**Uwaga** Nie używać razem z *enableInfinityScroll*). Default: `false` |
| paginationPage | `Number` | Aktualna strona przy używaniu paginacji (zarówno klasycznej jak i infinity). Default `1` |
| paginationPages | `Number` |  Ilość stron przy używaniu paginacji (zarówno klasycznej jak i infinity). Default `1`  |
| data | `Array, Object` | Dane do tabeli |
| noData | `String` | Komunikat przy braku danych. Default: `No data to display` |
| enableInfinityScroll | `String` | Czy używać na stronie paginacji typu inifnity scroll (**Uwaga** Nie używać razem z *enablePagination*). Default: `false` |
| rowKeyProp | `String` | Nazwa właściwości obiektu z tablicy który będzie służył za klucz rzędzu (musi być unikatowa!) |

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| pagination-page-select | Wywołuje się w momencie zmiany strony. Zwraca informacje którą stronę wybrano. |

Najczęstszy wygląd tej funkcji
```js
paginate(n){
    this.page = n;
    this.fetchData();
}
```

##### Schemat budowy
Prostej tablicy
```
<WkTable>
---<template v-slot="scope">
------<WkTableCol>
---------Zawartość 
------<WkTableCol>
---------Zawartość 
---...
------<WkTableCol>
---------Zawartość 
```
Rozwijanej tablicy
```
<WkTable>
---<template v-slot="scope">
------<WkTableCol>
---------Zawartość "nagłówka"
------<WkTableCol>
---------Zawartość  "nagłówka"
---...
------<WkTableCol>
---------Zawartość  "nagłówka"
---<template v-slot:expandable="scope">
------Zawartość rozwinięcia (Mamy tutaj dostęp do scope, tak jak w "nagłówku")

```
##### Zależności
*WkTable* korzysta z [vue-intersect](https://www.npmjs.com/package/vue-intersect)

## AnimatedCollapse

##### Użycie 
```
<WkAnimatedCollapse :show="false">
    <template>
        Treść!
    </template>
</WkAnimatedCollapse>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| show | `[String, Number, Boolean]` | Flaga informująca czy animated collapse ma być otwarty |
| remainOpen | `Boolean` | Jak otworzysz inne animated collapse to ten się nie zamknie |
| onValue | `[String, Number, Boolean]` | Jaka wartość ma być odpalającą. Default: `true` |

!> Animated Collapseów nie można zagnieżdzać.

## Hint

<img src="./images/hint.png"  style="display: block">

##### Użycie 
```
<WkHint title="Danger" type="danger">Treść informacji</WkHint>
<WkHint title="Info" type="info">Treść informacji</WkHint>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| title | `String` | Nagłówek hinta |
| type | `String` | Typ hinta. Default: `danger`. Możliwe: `danger`, `info` |


## Spinner

<img src="./images/hint.png"  style="display: block">

##### Użycie 

!> **Uwaga!** <br> Spinner będzie widoczny **tylko** w kontenerze z `position: relative`. Można to uzyskać nadając mu klasę `relative`

```
<div class="relative p-4">
    <WkSpinner show="true" color="#00ff00" />
</div>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| show | `Boolean` | Widoczność spinnera |
| color | `String` | Kolor spinnera. Default: `#fff`. **Uwaga** Wymagany zapis szesnastkowy. |


## Tooltip

<img src="./images/tooltip.png"  style="display: block">

##### Użycie 

Tooltip budujemy za pomocą 2 slotów. W pierwszym, nie nazwanym jest zawartość dymka z podpowiedzią. W drugim, z nazwą `reference` znajduje się zawartość po najechaniu której pojawia się tooltip.

```
<WkTooltip>
    <template>
        Treść podpowiedzi!
    </template>
    <template v-slot:reference>
        Najedź by zobaczyć tooltip
    </template>
</WkTooltip>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| position | `String` | Defaultowa pozycja tooltipa (gdy jest miejsce). Default: `right`. Możliwe: `top`, `left`, `right`, `bottom` |
| wide | `Boolean` | Czy tooltip ma być szeroki. Default: `false` |

##### Zależności
*WkTooltip* korzysta z [@popperjs](https://popper.js.org/)

## Confirm

<img src="./images/confirm.png"  style="display: block">

##### Użycie 
```
<WkConfirm >
    <template>
        Kliknij, by zobaczyć potwierdzenie
    </template>
</WkConfirm>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| position | `String` | Defaultowa pozycja dymku (gdy jest miejsce). Default: `top`. Możliwe: `top`, `left`, `right`, `bottom` |
| title | `Boolean` | Tytuł okienka z potwierdzeniem. Default: `Napewno chcesz usunąć?` |
| msg | `Boolean` | Dodatkowa wiadomość pod tytułem potwierdzenia. Domyślnie pusty. |
| confirmButtonText | `String` | Tekst wyświetlony na guziku potwierdzenia. Default `Tak` |
| confirmButtonType | `String` | Kolor guzika zatwierdzenie. Default: `danger`.  Możliwe: `info`, `danger`, `success`, `primary`, `secondary` |
| cancelButtonText | `String` | Tekst wyświetlony na guziku anulowania. Default `Anuluj` |

##### Emitowane funkcje
| Nazwa | Opis | 
|:-:|:-:|
| cancel | *WkConfirm* emituje zdarzenie *cancel* gdy zostaje kliknięty guzik anulowania |
| confirm |  *WkConfirm* emituje zdarzenie *cofnirm* gdy zostaje kliknięty guzik zatwierdzenia |

Po wyemitowaniu dowolnej z tych wartości, *WkConfirm* znika.
##### Zależności
*WkConfirm* korzysta z [@popperjs](https://popper.js.org/)

## Tamer Updater

Służy aktualizacji tamera.
!> Działa tylko w przypadku używnia WK-Tamer.
<!-- <img src="./images/confirm.png"  style="display: block"> -->

##### Użycie 
W *pierwszym viewsie* jaki zobaczy user (zwyczajowo dashboard)
```
<WkTamerUpdater />
```

Routy wk tamer (Dobrze jest dodać middleware pilnujący zalogowania)

```

$app->get("/api/_system/checkForUpdates", 'updater::check')->middleware('isAdminLoggedIn');
$app->post("/api/_system/update", 'updater::update')->middleware('isAdminLoggedIn');


```

updater.php
```
namespace Tamer\Routing;

class Controller {

    public function check($req, $res){

        $U = new \Tamer\System\Updater();

        $res->json([
            'success' => true,
            'data' => $U->checkForUpdates()
        ]);
    }

    public function update($req, $res){

        $U = new \Tamer\System\Updater();

        $res->json([
            'success' => true,
            'update_status' => $U->update()
        ]);
    }

    public function test($req, $res){
        $res->json([
            'success' => true,
            'time' => microtime(true),
            'tamer_version' => TAMER_VERSION
        ]);
    }

}
```