## Blog Editor

Blog Editor to pozwalający tworzyć dynamiczny kontent edytor zawierający możliwość tworzenia 4 rodzai kontentu: tekstu (za pomocą edytora [wysiwyg](/komponenty/wysiwyg/)), obrazków (za pomocą [filemanagera](/)), ramek iframe oraz dynamicznych tabel (za pomocą *edytora tabel*). Wszystko buduje się z bloczków.

<img src="./images/editor.png"  style="display: block">

##### Użycie 
```
<WkEditor @content-updated="(c)=>{editor = c}" :value="editor" :table="true"/>
```
#####  Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `Array` | Początkowa wartość edytora wypełniona blokami (schemat poniżej) |
| table | `Boolean` | Czy włączyć moduł edytowalnych tabeli. Default: `false` |
| debounce | `Boolean` | Czy ma działać debouncer. Default: `false` |
| debounceTime | `Boolean` | Czas debounca w przypadku włączenia debouncera. Default: `5000` |

!> **Uwaga** <br> Editor wymaga do poprawnego działania [filemanagera](/), edytora [wysiwyg](/) oraz WkTableEditora.

#####  Obiekt Block:

| Nazwa | Typ bloku | Opis | 
|:-:|:-:|:-:|
| type | `All` | Typ bloku, możliwe wartości: text, table, iframe, image |
| content | `All` | Zawartość. W przypadku typu `image` jest tam atrybut *alt* |
| c_id | `All` | Generowane id obiektu. Wszystkie zawierają prefix (`textblock_`, `table_`, `iframeblock_` lub `imageblock_`) |
| caption | `Image` | Podpis obrazka |
| image | `Image` | Link do obrazka |

!> *Uwaga!* <br> Editor group musi posiadać zarówno przypisany `value` do zmiennej typu `Array` jak i metodę `@content-updated` która ręcznie go aktualizuje. W naszym przypadku jest to najprostsze `(c)=>{this.editor = c}`

#####  Emits

| Nazwa | Opis| Zwracane dane | 
|:-:|:-:|:-:|
| content-updated |  Wywołuje się przy większości zmian treści.  | Zwraca cały `array` bloczków. |
| content-delete | Wywołuje się przy usunięciu bloczku | Pod zmienną obiekt z właściwością  `item` zwraca c_id bloczku do usunięcia |
| content-move | Wywołuje się przy przesuwaniu bloczków | Pod zmiennymi obiekt z właściwościami `item1` i `item2` zwraca c_id bloczków które trzeba zamienić miejscami |
| content-edit | Wywołuje się przy edycji bloczku | Zwraca obiekt z właściwością  `item` w którym zawiera się cały obiekt `block` do zedytowania |
| content-add | Wywołuje się przy dodaniu nowego bloczku | Zwraca obiekt z właściwością `item` w którym zawiera się cały obiekt `block` do dodania |

Edytor można (i dobrze jest) wystilizować tak jak front. Używa sie do tego klasy `wk-editor-custom-styles`

## Seo Checker

Seo Checker to moduł który współgra z komponentem *WkEditor*. Korzysta on z jego bloczków.

<img src="./images/seochecker.png"  style="display: block">

##### Użycie 
```
<WkSeoChecker 
    :meta="meta"
    :content="content_blocks"
    :metaDesc="meta.meta_desc"
    :keywords="meta.meta_keywords"
    domain="wirtuozikodu.pl"
/> 
```
#####  Props

| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| domain | `String` | Domena na której stoi aplikacja |
| content | `Array` | Tablica wypełniona blokami *WkEditor* |
| keywords | `String` | Słowa kluczowe sprawdzanego wpisu, oddzielone przecinkami. |
| metaDesc | `String` | Meta opis sprawdzanego wpisu  |
| metaTitle | `String`| Meta tytuł sprawdzanego wpisu  |

!> **Uwaga** <br> SeoChecker działa tylko z Edytorem.

