## Filemanager



<img src="./images/filemanager.png"  style="display: block">

##### Zależności

###### Zewnętrzne
- [v-click-outside](https://www.npmjs.com/package/v-click-outside)

###### Wewnętrzne

!> **Uwaga!** <br> Do poprawnego działania filemanagera, potrzebne jest skonfigurowanie zarówno (Axiosa)[/plugins/axios/] jak i (Alertów)[/plugins/alerts/]

##### Użycie
```
<WkFilemanager  @selected-file="(_) => selected_file = _ " :show="show_file_manager" @close="show_file_manager = false" prefix="files" />
```

##### Props
| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| maxFileSize | `Number` | Maksymalna dozwolona wielkość pliku do wrzucenia. W bitach. Default: `10485760` |
| show | `Boolean` | Flaga wyświetlająca/chowająca filemanager. Default: `false` |
| prefix | `String` | Folder z którego ma korzystać Filemanager.  /TODO TAMER DOCS/ Default: `files` |
| mimeTypeFilter | `Array` | Tablica z mimetypami plików które mają zostać wyświetlone. **Uwaga** Filter bierze pod uwagę tylko *pierwszy* człon mimetype (tj, jeżeli chcemy wyświetlić same obrazki używamy `['image']`. Przejdzie nam wtedy `image/png` jak i `image/jpg` i wszystkie inne pliki z mimetype `image/*`). W przypadku użycia  `['*']`, przepuszcza on wszystkie mimetype. Default: `['*']` |
| allowedImageMimetypes | `Array` | Tablica z dozwolonymi mimetypami obrazków. Obsługuje * z obu stron. Default: ['*'] |
| isNode | `Boolean` | Flaga informująca którego backendu używamy - node czy tamera. Default: `false`. |

##### Methods
| Nazwa | Opis | 
|:-:|:-:|
| selected-file | Emituje się w przypadku wybrania pliku, przekazuje jego obiekt. (zobacz poniżej) |

##### Zwracany obiekt
```js
{ 
    "entry_type": "file", 
    "entry_name": "d.png", 
    "entry_path": "/static/filemanager/files/d.png", 
    "entry_mod_date": 1614694902, 
    "entry_plainname": "d", 
    "entry_mimetype": "image/png", 
    "entry_extension": "png", 
    "entry_size": 22603, 
    "name_edit_mode": false 
}

```

#### Backend
##### WK-TAMER
link
##### Node.js
!> Należy pamiętać, że w przypadku wykorzystania backendu node.js, trzeba ustawić flagę `isNode` na `true`

//TODO: OPIS BACKENDU