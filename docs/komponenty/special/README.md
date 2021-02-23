## FormsEditor

Komponent pozwalający tworzyć edytowalne formularze


<img src="./images/formseditor.png"  style="display: block">

##### Użycie
```
<WkFormsEditor v-model="formseditor" />
```

##### Props
| Nazwa | Typ danych | Opis | 
|:-:|:-:|:-:|
| value | `Array` | Wartość edytora |
| consenseMode | `Boolean` | Zamienia edytor z trybu formularza na tryb zgód. |

##### Zwracany obiekt
Tryb formularza

```
{ 
    "type": "text", 
    "label": "Podpis pola", 
    "required": false, 
    "msg": "To pole jest wymagane.", 
    "c_id": "text_161406849379434622.07045337438" 
}, 
{ 
    "type": "checkbox", 
    "label": "Podpis pola", 
    "required": false, 
    "msg": "To pole jest wymagane.", 
    "c_id": "checkbox_1614068494402134.87406212526753" 
}, 
{ 
    "type": "select", 
    "label": "Podpis pola wyboru", 
    "required": false, 
    "msg": "To pole jest wymagane.", 
    "options": [], "c_id": "select_161406850061161235.21434053647" 
}, 
{ 
    "type": "switch", 
    "label": "Podpis pola", 
    "required": false, 
    "msg": "To pole jest wymagane.", 
    "c_id": "switch_161406850409949700.299394687296" 
}
```
Tryb zgód

```
{ 
    "type": "consense", 
    "lead": "Krótki tekst", 
    "required": false, 
    "msg": "To pole jest wymagane.", 
    "expandable": true, "details": "Długi tekst, detale.", "c_id": "consense_161406859707722949.182102204468" 
}
```