# Instalacja i konfiguracja projektu

## Instalacja

Aby zainstalować paczkę, wpisujemy w konsoli projektu

```
npm install wk-cms
```

## Konfiguracja projektu

W pliku `./main.js` importujemy naszą paczkę wraz z stylami

```js
import WKCMS from 'wk-cms';
import 'wk-cms/src/assets/scss/index.scss';

Vue.use(WKCMS);
```

### Konfig szablonu Viewport
W wybranym przez siebie pliku (Zalecamy plik `./App.vue`) ustawiamy podstawowy szablon viewportu.

```
<WkViewport dev-mode>
      <template v-slot:menu>
        Tu ustawimy nasz menubar 
      </template>
      <template v-slot:content>
        <router-view/>
      </template>
</WkViewport>
```

| Nazwa | Opis |
|:-:|:-:|
| menu | Do środka tego elementu template wstawiamy zawartość menu bocznego. <br>Aby skorzystać z naszego Menubara, przejdź do: TODO LINK"Menubar" |
| content | Do środka tego elementu template wstawiamy dowolną zawartość strony. W naszym przypadku jest to `<router-view>` |

!> WkVievport przyjmuje tylko jednego propsa i jest to dev-mode (default: `false`). W tym trybie nie sprawdza on połączenia z backendem.



<!-- ## Pluginy -->
<!-- - [Axios](/pluginy/axios/)
- [System wiadomości](/pluginy/messages/)
- [Logika logowania](/pluginy/login/) -->

<!-- ## Komponenty
#### Formularza
- [Input](/komponenty/formularza/input/)
- [FileInput](/komponenty/formularza/file-input/)
- [Wysiwyg](/komponenty/formularza/wyswig/)
- [Button](/komponenty/formularza/button/)
- [ButtonGroup](/komponenty/formularza/button-group/)
- [Checkbox](/komponenty/formularza/checkbox/)
- [Radio](/komponenty/formularza/radio/)
- [RadioGroup](/komponenty/formularza/radio-group/)
- [Switch](/komponenty/formularza/switch/)
- [Select](/komponenty/formularza/select/)

####  [**FileManager**](/komponenty/filemanager/)

#### Inne

- [AnimatedCollapse](/komponenty/inne/animated-collapse/)
- [Collapse](/komponenty/inne/collapse/)
- [Hint](/komponenty/inne/hint/)
- [Pagination](/komponenty/inne/pagination/)
- [Table](/komponenty/inne/table/)
- [Tooltip](/komponenty/inne/tooltip/)
- [Tabs](/komponenty/inne/tabs/)
- [Modal](/komponenty/inne/modal/)
- [Button Spinner](/komponenty/inne/button-spinner/)
- [Alert](/komponenty/inne/alerts/)

#### Layoutowe
- [Header](/komponenty/layout/header/)
- [Menubar](/komponenty/layout/menubar/)
- [Alerts](/komponenty/layout/alerts/)
     -->

