# Komponenty formularza

## Input

<img src="./images/input.png"  style="display: block">

##### Użycie 
```
<WkInput type="text" value="wartość" label="Label inputa"  />
```

##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `String, Number` | Wartość inputa |
| type | `String` | Typ inputa. Uzywamy typów inputów z HTML + *textarea* |
| size | `Size` | Rozmiar inputa. Możliwe wartości: `normal`,`small` |
| label | `String` | Label inputa |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji inputa |
| required | `Boolean` | Czy input jest wymagany (W przypadku użycia funkcji *validate*, input nie-wymagany zawsze zdaje test) |
| regex | `RegExp` | Pattern RegExpa wedle którego ma sprawdzać wartość przy *validate* |
| customValidator | `Function` | Własna funkcja wykorzystywana przy *validate* |
| max | `Number` | Maksymalna długość. **UWAGA**: Dotyczy to jedynie typu *number*. W innym przypadku użyjemy *maxLength* |
| disabled | `Boolean` | Flaga ustawiająca input w tryb disabled |
| id | `String` | Przypisuje inputowi htmlowe id |
| name | `String` | Przypisuje inputowi htmlowe name |
| textareaHeight | `Number` | Wysokość w przypadku użycia typu *textarea* |



##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| triggerFocus | Focusuje input |
| validate | Wywołuje funkcję walidującą która sprawdza warunki (required, regex, max, maxLength, customValidator). W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|

## Checkbox

<img src="./images/checkbox.png"  style="display: block">

##### Użycie 
```
<WkCheckbox :value="true" label="Podpis inputa" />
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `String, Number, Boolean` | Wartość checkboxowa |
| label | `String` | Label checkboxa |
| disabled | `Boolean` | Flaga ustawiająca checkboxa w tryb disabled |
| id | `String` | Przypisuje checkboxowi htmlowe id |
| onValue | `String, Number, Boolean` | Wartość którą checkbox przyjmuje w przypadku **zaznaczenia**. Domyślnie `true` |
| offValue | `String, Number, Boolean` | Wartość którą checkbox przyjmuje w przypadku **niezaznaczenia**. Domyślnie `true` |
| disableLabelOnOffState | `Boolean` | Ustawienie czy label ma się wyszarzyć w przypadku **niezaznaczenia**. Domyślnie `false` |

!> Domyślnie przy użyciu np. v-model, checbkox zwraca wartości `true` i `false`

## Switch

<img src="./images/switch.png"  style="display: block">

##### Użycie 
```
<WkSwitch :value="true" label="Podpis switcha" />
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `String, Number` | Wartość checkboxowa |
| label | `String` | Label switcha |
| disabled | `Boolean` | Flaga ustawiająca switcha w tryb disabled |
| onValue | `String, Number, Boolean` | Wartość którą switch przyjmuje w przypadku **zaznaczenia**. Domyślnie `true` |
| offValue | `String, Number, Boolean` | Wartość którą switch przyjmuje w przypadku **niezaznaczenia**. Domyślnie `false` |
| Type | `String` | Kolor switcha. Domyślnie `primary`. Jedyną inną wartością może być `secondary` |
| centered | `Boolean` | Nadaje switchowi `justify-content: center` |

!> Domyślnie przy użyciu np. v-model, switch zwraca wartości `true` i `false`

## Radio

<img src="./images/radio.png" style="display: block">

##### Użycie 

```
<WkRadio label="Radio 1" data="radio1" name="testradio" />
<WkRadio label="Radio 2" data="radio2" name="testradio" />
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| label | `String` | Label switcha |
| disabled | `Boolean` | Flaga ustawiająca switcha w tryb disabled |
| name | `String` | HTML'owa nazwa radio. Pozwala je grupować |
| data | `String` | Wartość którą "przekazuje" radio przy wybraniu |

!> Większą grupę elementów radio wygodnie jest stworzyć za pomocą **WkRadioGroup**


## RadioGroup

<img src="./images/radiosgroup.png" style="display: block">

RadioGroup to komponent pomagający dynamicznie stworzyć grupę elementów **WkRadio** za pomocą tablicy.

##### Użycie 
```
<WkRadioGroup :data="radioGroupData" name="radio-group"/>
```
```js
radioGroupData: [
    {
        value: "PHP",
        label: "Wybieram PHP"
    },
    {
        value: "JS",
        label: "Wybieram JS"
    },
    {
        value: "CSS",
        label: "Wybieram CSS"
    }
    ]
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| disabled | `Boolean` | Flaga ustawiająca wszystkie elementy radio w tryb disabled |
| name | `String` | HTML'owa nazwa elementów radio w grupie |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji radio group |
| required | `Boolean` | Czy wybór jest wymagany (W przypadku użycia funkcji *validate*, radio nie-wymagany zawsze zdaje test) |
| data | `Array` | Array z danymi do utworzenia elementów radio. Musi on posiadać 2 właściwości: value oraz label (które nie muszą się tak nazywać, jedynie muszą spełniać te funkcję. Nazwę można zmienić za pomocą wartości *dataValue*  oraz *dataLabel*). *Value* odpowiada za wartość danego radio w przypadku zaznaczenia (czy też *data* elementu **WkRadio**) a *label* jest jego podpisem |
| dataLabel | `String` | Nazwa właściwości obiektu z tablicy **data** która będzie treścią labela danego radio |
| dataValue | `String` | Nazwa właściwości obiektu z tablicy **data** która będzie wartością (*data* elementu **WkRadio**) danego radio |

!> Większą grupę elementów radio wygodnie jest stworzyć za pomocą **WkRadioGroup**

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| validate | Wywołuje funkcję walidującą która sprawdza warunki. W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|

## ButtonsGroup

<img src="./images/buttonsgroup.png" style="display: block">

ButtonsGroup to - mówiać najprościej - bardzo "fancy" radio inputy. Stąd też na zasadzie takiej analogii będzie opisany w dokumentacji.

##### Użycie 

```
<WkButtonsGroup :data="buttonsGroupData" name="btns" v-model="btnsGroupValue" @change="(_) => _ = btnsGroupValue" />
```
```js
btnsGroupValue: "PHP"
btnsGroupValue: [
    {
        value: "PHP",
        label: "PHP"
    },
    {
        value: "JS",
        label: "JS"
    },
    {
        value: "CSS",
        label: "CSS"
    }
    ]
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| disabled | `Boolean` | Flaga ustawiająca wszystkie elementy radio w tryb disabled |
| data | `Array` | Array z danymi do utworzenia elementów """radio""". Musi on posiadać 2 właściwości: value oraz label (które nie muszą się tak nazywać, jedynie muszą spełniać te funkcję. Nazwę można zmienić za pomocą wartości *dataValue*  oraz *dataLabel*). *Value* odpowiada za wartość danego """radio""" w przypadku zaznaczenia  a *label* jest jego podpisem |
| dataLabel | `String` | Nazwa właściwości obiektu z tablicy **data** która będzie treścią labela danego """radio""" |
| dataValue | `String` | Nazwa właściwości obiektu z tablicy **data** która będzie wartością danego """radio""" |

!> *Uwaga!* <br> Btns group musi posiadać zarówno przypisany `v-model` do zmiennej tekstowej (zawierającej na start jedną z  potencjalnych wartości) jak i metodę `@change` która ręcznie go aktualizuje. W naszym przypadku jest to najprostsze `@change="(_) => _ = btnsGroupValue"`


## Select

<img src="./images/select.png"  style="display: block">


##### Użycie 
```
<WkSelect label="Label selecta" :options="selectOptions" v-model="selectValue" textProp="text" valueProp="value" />
```
```js
selectValue: "";
selectOptions: [
    {
        value: "PHP",
        text: "Wybieram PHP"
    },
    {
        value: "JS",
        text: "Wybieram JS"
    },
    {
        value: "CSS",
        text: "Wybieram CSS"
    }
    ]
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `String` | Wartość selecta |
| disabled | `Boolean` | Flaga ustawiająca wsselect w tryb disabled |
| name | `String` | HTML'owa nazwa selectu |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji |
| required | `Boolean` | Czy wybór jest wymagany (W przypadku użycia funkcji *validate*, radio nie-wymagany zawsze zdaje test) |
| options | `Array` | Array z danymi do utworzenia opcji selecta. Musi on posiadać 2 właściwości: value oraz text (które nie muszą się tak nazywać, jedynie muszą spełniać te funkcję. Nazwę można zmienić za pomocą wartości *valueProp*  oraz *textProp*). *Value* odpowiada za wartość selecta w przypadku zaznaczenia a *text* jest jego podpisem |
| textProp | `String` | Nazwa właściwości obiektu z tablicy **options** która będzie treścią (tekstem) opcji. Default: `name` |
| valueProp | `String` | Nazwa właściwości obiektu z tablicy **options** która będzie wartością opcji. Default: `id` |
| noData | `String` | Tekst który wyświelta się gdy select jest pusty (tj, array *options* jest pusty). Default: `No data` |
| clearable | `Boolean, String` | Czy jest możliwość wyczyszczenia selectu |
| label | `String` | Label selectu |
| value | `String, Number` | Value selectu |
| id | `String` | Przypisuje selectu htmlowe id |

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| validate | Wywołuje funkcję walidującą która sprawdza warunki. W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|


## MultiSelect

<img src="./images/multiselect.png"  style="display: block">

##### Użycie 
```
<WkMultiSelect label="Label selecta" :options="selectOptions" v-model="multiSelectValue"  textProp="text"/>
```
```js
multiSelectValue: [],
selectOptions: [
    {
        id: "PHP",
        text: "Wybieram PHP"
    },
    {
        id: "JS",
        text: "Wybieram JS"
    },
    {
        id: "CSS",
        text: "Wybieram CSS"
    }
    ]
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `Array` | Wartość selecta |
| disabled | `Boolean` | Flaga ustawiająca select w tryb disabled |
| name | `String` | HTML'owa nazwa selectu |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji |
| required | `Boolean` | Czy wybór jest wymagany (W przypadku użycia funkcji *validate*, radio nie-wymagany zawsze zdaje test) |
| options | `Array` | Array z danymi do utworzenia opcji selecta. Musi on posiadać 2 właściwości: value oraz text (które nie muszą się tak nazywać, jedynie muszą spełniać te funkcję. Nazwę można zmienić za pomocą wartości *valueProp*  oraz *textProp*). *Value* odpowiada za wartość selecta w przypadku zaznaczenia a *text* jest jego podpisem |
| textProp | `String` | Nazwa właściwości obiektu z tablicy **options** która będzie treścią (tekstem) opcji. Default: `name` |
| valueProp | `String` | Nazwa właściwości obiektu z tablicy **options** która będzie wartością opcji. Default: `id` |
| noData | `String` | Tekst który wyświelta się gdy select jest pusty (tj, array *options* jest pusty). Default: `No data` |
| clearable | `Boolean, String` | Czy jest możliwość wyczyszczenia selectu |
| label | `String` | Label selectu |
| value | `String, Number` | Value selectu |
| id | `String` | Przypisuje selectu htmlowe id |

!> **UWAGA** <br> Należy jako v-model podać **tablicę** (`Array`)!

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| validate | Wywołuje funkcję walidującą która sprawdza warunki. W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|


## SearchSelect

<img src="./images/searchselect.png"  style="display: block">

##### Użycie 
```
<WkSearchSelect 
    label="Wyszukaj po wycieczce"
    url="https://api.biurko.store.wirtuozikodu.pl/v1/regions/"
    value-prop="_id"
    text-prop="name.pl"
    v-model="searchedTrip"
    data-prop="regions"
    noData="Nie znaleziono"
    single-item-url="lol"
    single-item-data-prop="trip"
/>
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `Search` | Wartość selecta |
| disabled | `Boolean` | Flaga ustawiająca select w tryb disabled |
| label | `String` | Label selectu |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji |
| required | `Boolean` | Czy wybór jest wymagany (W przypadku użycia funkcji *validate*, radio nie-wymagany zawsze zdaje test) |
| textProp | `String` | Nazwa właściwości obiektu zwróconego z api która będzie treścią (tekstem) opcji. Default: `name` |
| valueProp | `String` | Nazwa właściwościobiektu zwróconego z api która będzie wartością opcji. Default: `id` |
| noData | `String` | Tekst który wyświelta się gdy select jest pusty (tj, array *options* jest pusty). Default: `No data` |
| clearable | `Boolean, String` | Czy jest możliwość wyczyszczenia selectu |
| id | `String` | Przypisuje selectu htmlowe id |
| name | `String` | Przypisuje selectu htmlowe name. Można przeszukiwać zarówno zewnętrznie od *https* jak i wewnętrznie od */*  |
| url | `String` | Url do Api, pod tym adresem Search String szuka danych |
| dataProp | `String` | Informacja pod jaką właściwością obiektu z odpowiedzi serwera znajdują się dane |
| singleItemUrl | `String` |  Url do Api pod którym może pobrać jeden element, jeżeli select na start dostanie jakieś dane |
| singleItemDataProp | `String` |  Informacja pod jaką właściwością obiektu z odpowiedzi serwera znajdują się dane  w przypadku wyszukiwania pojedyńczej opcji |

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| validate | Wywołuje funkcję walidującą która sprawdza warunki. W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|

## FileInput

<img src="./images/fileinput.png"  style="display: block">

##### Użycie 
```
<WkFileInput v-model="fileInput" />
```
##### Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `Array` | Wartość file input. Nie da się jednakże na start nic mu nadać |
| disabled | `Boolean` | Flaga ustawiająca select w tryb disabled |
| label | `String` | Label selectu |
| msg | `String` | Wiadomość która wyświetli się w przypadku błędu walidacji |
| required | `Boolean` | Czy wybór jest wymagany (W przypadku użycia funkcji *validate*, radio nie-wymagany zawsze zdaje test) |
| showFileList | `Boolean, String` | Flaga określająca widocznośc listy plików. Default `false` |
| file_name_reg | `String` | String zawierający regexp określający nazwę pliku. Default "" |
| multi | `Boolean, String` | Flaga określająca czy ma być to multiselect. Default `false` |
| filesLimit | `Number` | Maksymalna ilość plików do wybrania. Default `1` |
| small | `Boolean, String` | Flaga określająca, czy **FileInput** ma się wyświetlić w wersji small. Default `false` |
| progressbar_value | `Number` | Poziom załadowania, zakres od 0 do 100. W przypadku > 0 wyświetla progress bar Default `0` |
| minFiles | `Number` | Minimalna ilość plików jaką można wybrać. Default `1` |

!> **Uwaga** <br> File input **zawsze** zwraca array plików (type `File`)

##### Przykładowy plik
```
lastModified: 1613376405143
lastModifiedDate: Mon Feb 15 2021 09:06:45 GMT+0100 (czas środkowoeuropejski standardowy) {}
name: "token.png"
size: 68554
type: "image/png"
webkitRelativePath: ""
```

##### Methods

| Nazwa | Opis | 
|:-:|:-:|
| validate | Wywołuje funkcję walidującą która sprawdza warunki. W przypadku poprawnego przejścia walidacji zwraca `true`, w każdym innym przypadku `false`|

