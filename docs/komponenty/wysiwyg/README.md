## Wysiwig

Nasz wysiwig korzysta z Quilla. [Dokumentacja](https://quilljs.com/)

#### Zależności

##### Zewnętrzne
- [Quill](https://www.npmjs.com/package/quill)
- [Quill Image Resize](https://www.npmjs.com/package/quill-image-resize)

##### Wewnętrzne
Do obsługi obrazków potrzeba poprawnie skonfigurowanego (za pomocą [filemanagera](/)).

<img src="./images/wysiwyg.png"  style="display: block">

##### Użycie
```
<WkWysiwyg v-model="wysiwyg" label="Label edytora" allowImages/>
```

##### Props
| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `String` | Wartość tekstowa edytora |
| label | `String` | Label edytora |
| allowImages | `Boolean` | Flaga pozwalająca wyłączyć możliwość dodawania obrazków i plików (a co za tym idzie, sprawia, że nie jest potrzebne skonfiurowanie filemanagera). Default: `false`  |
| prefix | `String` | Prefix z którego ma korzystać Filemanager (zobacz [Filemanager](/)). Default: `files` |
| allowedFileMimetypes | `Array` | Tablica z dozwolonymi mimetypami plików. Obsługuje * z obu stron. Default: ['*'] |
| allowedImageMimetypes | `Array` | Tablica z dozwolonymi mimetypami obrazków. Obsługuje * z obu stron. Default: ['image/*'] |