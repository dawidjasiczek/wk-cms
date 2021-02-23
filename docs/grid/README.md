# Budowa systemu grid w wk cms 

## Grid
<img src="./images/grid.png"  style="display: block; ">

System grid jest oparty na [scss-flex-grid](https://github.com/matthewsimo/scss-flex-grid).
<br>
Zakłada on mobile first tj. wszelkie wysokości określa się od mobilków do desktop.



##### Użycie

```
<WkRow class="my-1">
    <WkCol span="3"  >
        Zawartość o szerokości 3
    </WkCol>
    <WkCol span="6"  >
        Zawartość o szerokości 3
    </WkCol>
    <WkCol span="3"  >
        Zawartość o szerokości 3
    </WkCol>
</WkRow>
```


##### Props

| Nazwa | Opis |
|:-:|:-:|
| span | Ilość kolumn które omija licząc od lewej  . Domyślna wartość jeżeli nie uściślono innych.Jest on tożsamy z *xs* |
| xs | Ilość kolumn które omija licząc od lewej  . |
| sm | Ilość kolumn które omija licząc od lewej   na ekranie > 650px |
| md | Ilość kolumn które omija licząc od lewej   na ekranie > 960px |
| lg | Ilość kolumn które omija licząc od lewej   na ekranie > 1440px |
| xl | Ilość kolumn które omija licząc od lewej   na ekranie > 1920px |



## Offset

<img src="./images/offset.png"  style="display: block; ">

Na kolumny można nakładać także offset. 

##### Użycie

```
<WkRow class="my-1">
    <WkCol offset="3"  >
        Zawartość o szerokości 3
    </WkCol>
    <WkCol span="6"  >
        Zawartość o szerokości 3
    </WkCol>
</WkRow>
```

##### Props

| Nazwa | Opis |
|:-:|:-:|
| offset | Ilość kolumn które omija licząc od lewej. Domyślna wartość jeżeli nie uściślono innych.Jest on tożsamy z *xs* |
| offset-xs | Ilość kolumn które omija licząc od lewej|
| offset-sm | Ilość kolumn które omija licząc od lewej na ekranie > 650px |
| offset-md | Ilość kolumn które omija licząc od lewej na ekranie > 960px |
| offset-lg | Ilość kolumn które omija licząc od lewej na ekranie > 1440px |
| offset-xl | Ilość kolumn które omija licząc od lewej na ekranie > 1920px |

#### Offset Reset
Offset na dowolnym poziomie może przyjąć wartość "reset". Wtedy, w określonych warunkach reset jest anulowany. Przykład:
```
<WkCol 
    xs="9" offset-xs="3" 
    sm="12" offset-sm="reset"
    md="3" offset-md="9"
>
...
</WkCol>
```

<figure>
  <img src="./images/grid-offset-1.png"  style="display: block; ">
  <figcaption>Ekran 490px</figcaption>
</figure>
<figure>
  <img src="./images/grid-offset-2.png"  style="display: block; ">
  <figcaption>Ekran 800px</figcaption>
</figure>
<figure>
  <img src="./images/grid-offset-3.png"  style="display: block; ">
  <figcaption>Ekran 1200px</figcaption>
</figure>

## Inne informacje

##### Wartości domyślne:
| Nazwa | Opis |
|:-:|:-:|
| Ilość kolumn | 12 |
| Margin | 15px |

##### Breakpoints

!> Są to wartości używane w całym systemie

| Nazwa | Breakpoint |
|:-:|:-:|
| xs | 400px |
| sm | 650px |
| md | 960px |
| lg | 1440px |
| xl | 1920px |
