### Stworzenie menu

Wszystko wrzucamy do slotu "menu" (Zobacz: [Konfiguracja szablonu Viewport](/instalacja/?id=konfig-szablonu-viewport/)) 


#### Opcja w menu

<img src="./images/menuoption.png"  style="display: block">


##### Tworzenie
```
<WkMenubarOption :to="'/admin/trip-categories'">
    <template v-slot:icon>
        <fa-icon icon="suitcase-rolling" />
    </template>
    <template>
        Kategorie wycieczek
    </template>
</WkMenubarOption>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| to | `String` | Adres do którego ma linkować opcja menu |

#### Grupa menu

<img src="./images/menugroup.png"  style="display: block">

##### Tworzenie
```
<WkMenubarGroup name="Nazwa grupy">
        <WkMenubarOption to="'/admin/trip-categories'" >
            <template v-slot:icon>
                <fa-icon icon="suitcase-rolling" />
            </template>
            <template>
                Podróże
            </template>
        </WkMenubarOption>
        <WkMenubarOption :to="'/admin/trip-categories'">
            <template v-slot:icon>
                <fa-icon icon="globe" />
            </template>
            <template>
                Ziemia
            </template>
    </WkMenubarOption>
</WkMenubarGroup>
```
| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| name | `String` | Nazwa grupy |

#### Rozwijana grupa opcji w menu

<img src="./images/menuoptionsgroup.png"  style="display: block">

##### Tworzenie
```
<WkMenubarOptionsGroup
    :options="[
        {
            name: 'Robots.txt',
            to: '/admin/options-robots'
        },
        {
            name: 'Przekierowania',
            to: '/admin/options-redirects'
        },
        {
            name: 'Meta',
            to: '/admin/options-meta'
        },
        {
            name: 'Wyróżnione wycieczki',
            to: '/admin/options-mainpage-trips'
        }
    ]"
>
    <template v-slot:icon>
        <fa-icon icon="cogs"/>
    </template>
    <template>
        Ustawienia dodatkowe
    </template>
</WkMenubarOptionsGroup>
```
##### Props 

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| options | `Array` | Tablica obiektów będące linkami menu. Każdy obiekt zawiera `name` - nazwę opcji w menu oraz `to` będące linkiem  |

`<template>` Zawiera nazwę grupy. <br>
`<template v-slot:icon>` Zawiera ikonę grupy