<template>
    <div>
        <div class="wk-seo-checker">
            <div class="wk-seo-checker-results" v-if="content.length > 0">
                <div class="row" style="margin-bottom: 30px;">
                    <div class="test-name">
                                <b>Ogólny wynik testu SEO</b>
                            
                                <button class="btn btn--sm btn--info ml-1" @click="showFull = !showFull">
                                    <fa-icon :icon="(showFull)? 'arrow-up':'arrow-down'"/>
                                    {{(showFull)? "Zwiń":"Rozwiń"}}
                                </button>
                        
                        
                    </div>
                    <div class="wk-seo-checker-progressbar">
                        <div class="icon">
                            <div class="result-icon nok">
                                <fa-icon icon="frown" />
                            </div>
                            Źle
                        </div>
                        <div class="progressbar">
                            <div 
                                class="bar" 
                                :style="{'transform': 'scaleX(' + (currPoints/maxPoints) + ')'}"
                                :class="{'avg': (currPoints/maxPoints >= 0.45), 'ok': (currPoints/maxPoints >= 0.75)}"
                            >
                            </div>
                            <div class="text">
                                {{Math.round(currPoints/maxPoints * 100)}}%
                            </div>
                        </div>
                        <div class="icon">
                            <div class="result-icon ok">
                                <fa-icon icon="smile" />
                            </div>
                            Dobrze
                        </div>
                    </div>
                </div>
                <WkAnimatedCollapse :show="showFull">
                    <WkHint type="info" title="Informacja">Aby wyniki były miarodajne musisz uzupełnić większość pól (zarówno meta jak i "zwykłych")</WkHint>
                    
                    <div class="row mt-1" v-for="(t, ind) in tests" :key="t.name">
                        <div class="test-name"><b>Test #{{ind + 1}}:</b> {{t.name}}</div>
                        <div class="test-result">
                            <div class="result-icon ok" v-if="t.result.status == 'OK'">
                                <fa-icon icon="smile" />
                            </div>
                            <div class="result-icon avg" v-else-if="t.result.status == 'AVG'">
                                <fa-icon icon="meh" />
                            </div>
                            <div class="result-icon nok" v-else>
                                <fa-icon icon="frown" />
                            </div>
                            <div class="result-msg">
                                {{t.result.msg}}
                            </div>
                        </div>   
                    </div>
                </WkAnimatedCollapse>
                
            </div>
            <div class="wk-seo-checker-footer">
                <a href="https://wirtuozikodu.pl" target="_blank">
                    WK-SeoChecker Made with <fa-icon icon="heart" /> by <img src="https://wirtuozikodu.pl/static/imgs/logo.svg" alt="WK"> Wirtuozi Kodu
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            showFull: false,
        }
    },
    props: {
        domain: {
            type: String,
            default: ""
        },
        content:{
            type: Array,
            default: ()=>{
                return  []
            }
        },
        keywords:{
            type: String,
            default: "wpis,wpisy"
        },
        metaTitle: {
            type: String,
            default: "metatitle"
        },
        metaDesc: {
            type: String,
            default: "metadesc"
        },
    },
    computed:{
        keywordsArray(){
            let k  = this.keywords.split(",");
            for(let i = 0; i < k.length; i++){
                k[i] = k[i].trim();
            }
            return k
        },
        html(){
            const h = document.createElement('div');
            h.innerHTML = this.translatedHtml();
            return h;
        },
        pArr(){
            return this.html.querySelectorAll("p");
        },
        h1Arr(){
            return this.html.querySelectorAll("h1");
        },
        h2Arr(){
            return this.html.querySelectorAll("h2");
        },
        h3Arr(){
            return this.html.querySelectorAll("h3");
        },
        h4Arr(){
            return this.html.querySelectorAll("h4");
        },
        imgArr(){
            return this.html.querySelectorAll("img");
        },
        aArr(){
            return this.html.querySelectorAll("a");
        },
        sentencesString(){
            let str = '';
            if(this.h1Arr.length > 0) str += this.getSentencesFromNodeArray(this.h1Arr);
            if(this.h2Arr.length > 0) str += this.getSentencesFromNodeArray(this.h2Arr);
            if(this.h3Arr.length > 0) str += this.getSentencesFromNodeArray(this.h3Arr);
            if(this.h4Arr.length > 0) str += this.getSentencesFromNodeArray(this.h4Arr);
            
            str += this.getSentencesFromNodeArray(this.pArr);
            
            return str;
        },
        words(){
            return this.sentencesString.split('{|}').join(" ").split(" ");
        },
        wordsCount(){
            return this.words.length;
        },
        sentencesArr(){
            return this.sentencesString.split('{|}');
        },
        tests(){
            
            return [
                {
                    name: 'Występowanie słów łączących i ułatwiających czytanie',
                    weight: 0.7,
                    result: this.transitonWords()
                },
                {
                    name: 'Ogólna łatwość czytania tekstu',
                    weight: 0.7,
                    result: this.easyReading()
                },
                {
                    name: 'Występowanie nagłówków różnego typu',
                    weight: 1,
                    result: this.headingsTest()
                },
                {
                    name: 'Stosunek nagłówków do akapitów',
                    weight: 1,
                    result: this.headingsToParagraphs()
                },
                {
                    name: 'Długość akapitów',
                    weight: 0.8,
                    result: this.paragraphsLenght()
                },
                {
                    name: 'Długość zdań',
                    weight: 0.9,
                    result: this.sentencesLength()
                },
                {
                    name: 'Słowo kluczowe w pierwszym akapicie',
                    weight: 1,
                    result: this.firstParagraphKeyword()
                },
                {
                    name: 'Częstotliwość występowania słów kluczowych',
                    weight: 0.7,
                    result: this.keywordFrequency()
                },
                {
                    name: 'Meta opis',
                    weight: 1,
                    result: this.metadescChecker()
                },
                {
                    name: 'Słowo kluczowe w nagłówkach',
                    weight: 0.8,
                    result: this.keywordInHeaders()
                },
                {
                    name: 'Posiadanie przez obrazki atrybutu alt',
                    weight: 1,
                    result: this.imagesHaveAlt()
                },
                {
                    name: 'Alt obrazka zawiera słowo kluczowe',
                    weight: 0.2,
                    result: this.imagesAltIsKeyword()
                },
                {
                    name: 'Długość tekstu',
                    weight: 1,
                    result: this.textLenght()
                },
                {
                    name: 'Linki wewnętrzne',
                    weight: 0.7,
                    result: this.insideLinks()
                },
                {
                    name: 'Meta tytuł',
                    weight: 1,
                    result: this.metatitleCheck()
                }
            ]
        },
        maxPoints(){
            return (this.tests.reduce((prev, curr) => {
                if(typeof prev == 'object'){
                    return prev.weight + curr.weight;
                }
                return prev + curr.weight;
            },0)).toFixed(2)
        },
        currPoints(){
            return (this.tests.reduce((prev, curr) => {
                let r1 = prev;
                if(typeof prev == 'object'){
                    if(prev.result.status == 'AVG') r1 = 0.5 * prev.weight;
                    if(prev.result.status == 'OK') r1 = 1 * prev.weight;
                    if(prev.result.status == 'BAD') r1 = 0;
                }
                let r2 = 0;
                if(curr.result.status == 'AVG') r2 = 0.5 * curr.weight;
                if(curr.result.status == 'OK') r2 = 1 * curr.weight;
                return r1 + r2;
            }, 0)).toFixed(2);
        },
        
    },
    methods: {
        translatedHtml(){
            let html = "";
            for (let i = 0; i < this.content.length; i++) {
                const block = this.content[i];
                if(block.type == "text"){
                    html += block.content
                }
                else if(block.type == "image"){
                    html += `<figure><img src="${this.$store.state.frontUrl+block.image}" alt="${block.content}" class="wk-editor__block-img"><figcaption>${block.caption}</figcaption></figure>`
                }else if(block.type == "table"){
                    for (let i = 0; i < block.content.length; i++) {
                        for (let j = 0; j < block.content[i].length; j++) {
                            html += block.content[i][j];
                        }
                    }
                }
            }
            return html;
        },
        getSentencesFromNodeArray(nodes){
            let str = "";
            for(let i = 0; i < nodes.length; i++){
                str += nodes[i].innerText;
            }
            //wszystkie terminatory zdań na kropki
            str = str.replace(/[?!]/g, '.');
            //wielokropki na kropki
            str = str.replace(/\.+/g, '.');
            //spacje przed kropkami
            str = str.replace(/ +\./g, '.');
            //wyrzucenie wszystkich znaków nie literowych
            str = str.replace(/[^A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż \-\.]/g, '');
            //wyrzucenie dodatkowych spacji
            str = str.replace(/\s+/g, " ");
            //wyrzucenie dodatkowych myślników
            str = str.replace(/\-+/g, "-");
            //myślnik jako spacja
            str = str.replace(/\-/g, ' ');
            //rozbicie na string zdań
            str = str.replace(/([a-ząęćłńóźż])[\.\s]*([A-ZŚŁŻŹÓ])/g, '$1{|}$2');
            //usunięcie pozostałych kropek (skrótowce + ostatnie zdanie)
            str = str.replace(/\./g, '');
            
            return str;
        },
        // TESTY
        metatitleCheck(){
            let metatitle = this.metaTitle;
            // Sprawdza, czy istnieje meta title
            if(metatitle == undefined || metatitle === ''){
                return {
                    status: "BAD",
                    msg: "Twój meta tytuł ma więcej niz 70 (0) znaków oraz nie zawiera słowa kluczowego strony - dobrze byłoby, gdyby było ono w pierwszych lub ostatnich 3 słowach"
                }
            }
            let toLong = false;
            let include = false;
            //Sprawdza, czy nie jest za długi
            if(metatitle.length > 70){
                toLong = true;
            }
            for(let i = 0; i < this.keywordsArray.length; i++){
                if(metatitle.toLowerCase().includes(this.keywordsArray[i].toLowerCase())){
                    include = true;
                }
            }
            
            if(!toLong && include){
                return {
                    status: "OK",
                    msg: "Twój meta tytuł ma mniej niz 70 ("+metatitle.length+") znaków oraz zawiera jedno ze słów kluczowych strony - dobrze byłoby, gdyby było ono w pierwszych lub ostatnich 3 słowach"
                }
            }
            if(toLong && include){
                return {
                    status: "AVG",
                    msg: "Twój meta tytuł ma więcej niz 70 ("+metatitle.length+") znaków oraz zawiera jedno ze słów kluczowych strony - dobrze byłoby, gdyby było ono w pierwszych lub ostatnich 3 słowach"
                }
            }
            if(!toLong && !include){
                return {
                    status: "AVG",
                    msg: "Twój meta tytuł ma mniej niz 70 ("+metatitle.length+") znaków oraz nie zawiera słowa kluczowego strony -  dobrze byłoby, gdyby było ono w pierwszych lub ostatnich 3 słowach"
                }
            }
            if(toLong && !include){
                return {
                    status: "BAD",
                    msg: "Twój meta tytuł ma więcej niz 70 ("+metatitle.length+") znaków oraz nie zawiera żadnego słowa kluczowego strony - dobrze byłoby, gdyby było ono w pierwszych lub ostatnich 3 słowach"
                }
            }
        },
        sentencesLength(){
            let b = 0;
            let sentences = this.sentencesArr;
            for(let i = 0; i< sentences.length ; i++){
                if(sentences[i].split(" ").length > 25){
                    b++;
                }
            }
            let result  = b/sentences.length * 100;
            if(result > 25){
                return {
                    status: "BAD",
                    msg: "Twój tekst posiada: "+b+" zdań ("+result.toFixed(2)+"% objętości tekstu)  dłuzszych niz 25 słów. Powinieneś to poprawić"
                }
            }
            if(result < 25){
                return {
                    status: "OK",
                    msg: "Twój tekst posiada: "+b+" zdań ("+result.toFixed(2)+"% objętości tekstu)  dłuzszych niz 25 słów. Jest dobrze!"
                }
            }
        },
        textLenght(){
            let words = this.words;
            if(words.length < 300){
                return{
                    status: "BAD",
                    msg: "Twój tekst powinien mieć więcej niz 300 słów! Aktualnie: "+words.length
                }
            }
            else if(words.length == 300){
                return{
                    status: "AVG",
                    msg: "Twój tekst powinien mieć więcej niz 300 słów! Aktualnie: "+words.length
                }
            }
            else{
                return{
                    status: "OK",
                    msg: "Twój tekst ma więcej niz 300 słów! Aktualnie: "+words.length
                }
            }
        },
        imagesHaveAlt(){
            let b = 0;
            let imgs = this.imgArr;
            for (let i = 0; i < imgs.length; i++) {
                if(imgs[i].alt == "" || imgs[i].alt == "undefined" || imgs[i].alt == undefined){
                    b++;
                }  
            }
            if(b < 1){
                return {
                    status: "OK",
                    msg: "Wszystkie obrazki posiadają opis alternatywny (alt)"
                }
            }
            if(b >= 1){
                return {
                    status: "BAD",
                    msg: b+" obraz(-ki) nie posiada(-ją) opisu alternatywnego (alt)"
                }
            }
        },
        imagesAltIsKeyword(){
            let b = 0;
            let imgs = this.imgArr;
            for (let i = 0; i < imgs.length; i++) {
                for(let j = 0; j < this.keywordsArray.length; j++){
                    if(imgs[i].alt.toLowerCase().includes(this.keywordsArray[j].toLowerCase())){
                        b++;
                    }
                }
            }
            let result =  b/imgs.length;
            if(b == 0){
                result = 0;
            }
            
            if(result>0.50){
                return {
                    status: "OK",
                    msg: "Ponad 50% obrazkow ma w opisie alternatywnym jakieś słowo kluczowe ("+result.toFixed(2)+")"
                }
            }
            else if(result == 0.50){
                return {
                    status: "AVG",
                    msg: "Równo 50% obrazków ma w opisie słowo kluczowe. Spróbuj to poprawić"
                }
            }
            else {
                return {
                    status: "BAD",
                    msg: "Ponizej 50% obrazkow ma w opisie alternatywnym słowo kluczowe ("+result.toFixed(2)+")"
                }
            }
        },
        keywordInHeaders(){
            let str = "";
            str += this.getSentencesFromNodeArray(this.h1Arr);
            str += this.getSentencesFromNodeArray(this.h2Arr);
            str += this.getSentencesFromNodeArray(this.h3Arr);
            str += this.getSentencesFromNodeArray(this.h4Arr);
            let result = false;
            for(let j = 0; j < this.keywordsArray.length; j++){
                if(str.toLowerCase().includes(this.keywordsArray[j].toLowerCase())){
                    result = true;
                    break;
                }
            }
            
            if(result){
                return {
                    status: "OK",
                    msg: "Nagłówki zawierają chociaż raz słowo kluczowe"
                }
            }
            if(!result){
                return {
                    status: "BAD",
                    msg: "Nagłówki nie zawierają słowa kluczowego"
                }
            }
        },
        metadescChecker() {
            let meta = this.metaDesc;
            let include = false;
            let toLong = false;
            let toShort = false;
            let ml = meta.split("").length;

            for(let j = 0; j < this.keywordsArray.length; j++){
                if(meta.toLowerCase().includes(this.keywordsArray[j].toLowerCase())){
                    include = true;
                    break;
                }
            }
            if(ml > 160){
                toLong = true;
            }
            if(ml < 50){
                toShort = true;
            }
            
            if(include && (!toShort && !toLong)){
                return {
                    status: "OK",
                    msg: "Meta Opis ma od 50 do 160 ("+ml+") znaków długości i zawiera słowo kluczowe"
                }
            }
            if(!include && (!toShort && !toLong)){
                return {
                    status: "AVG",
                    msg: "Meta Opis ma od 50 do 160 ("+ml+") znaków długości, ale nie zawiera słowa kluczowego"
                }
            }
            if(include && (toShort || toLong)){
                return {
                    status: "AVG",
                    msg: "Meta Opis nie ma od 50 do 160 ("+ml+") znaków długości, ale zawiera słowo kluczowe"
                }
            }
            if(!include && (toShort || toLong)){
                return {
                    status: "BAD",
                    msg: "Meta Opis nie ma od 50 do 160 ("+ml+") znaków długości i nie zawiera słowa kluczowego"
                }
            }
        },
        keywordFrequency(){
            RegExp.escape = function(string) {
                return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
            };
            let words = this.words;
            let str = this.sentencesString.toLowerCase();

            let count = 0;
            for(let i=0; i < this.keywordsArray.length; i++){
                let k = this.keywordsArray[i];
                let r = new RegExp(k, 'g');
                let c = (str.match(r) || []).length;
                count += c;
            }
            

            let result = count/words.length;
            if(result <= 0.05 && result >= 0.005)return{
                status: "OK",
                msg: "Słowo kluczowe występuje w tekście od 0.5% do 5% w stosunku do ilości wszystkich wyrazów. Aktualnie: "+(result*100).toFixed(2)+"%"
            }
            else return{
                status: "BAD",
                msg: "Słowo kluczowe powinno występować w tekście od 0.5% do 5% w stosunku do ilości wszystkich wyrazów. Aktualnie: "+(result*100).toFixed(2)+"%"
            }
        },
        easyReading(){ 
            //Wzór:
            // 0,4 * ([średnia ilość słów w zdaniu] + 100 * [stosunek ilości słów trudnych do wszystkich słów])
            /**
             *  1-6	język bardzo prosty, zrozumiały już dla uczniów szkoły podstawowej
                7-9	język prosty, zrozumiały już dla uczniów gimnazjum
                10-12	język dość prosty, zrozumiały już dla uczniów liceum
                13-15	język dość trudny, zrozumiały dla studentów studiów licencjackich
                16-17	język trudny, zrozumiały dla studentów studiów magisterskich
                18 i więcej	język bardzo trudny, zrozumiały dla magistrów i osób z wyższym wykształceniem
             */
            let hardWords = 0;
            for(let i = 0; i < this.words.length; i++){
                let w = this.words[i];
                let r = w.match(/[aąeęoóuyi]{1,2}/g);
                if(r == null) r = [];
            
                if(r.length >= 4) hardWords += 1;
            }
            
            let result = 0.4 * ((this.words.length / this.sentencesArr.length) + 100 * (hardWords / this.words.length));
            
            if(result > 15){
                return {
                    status: "BAD",
                    msg: "Twój tekst jest trudny do przeczytania. Masz: "+result.toFixed(2)+" pkt. Przedział 'zły': > 15"
                }
            }
            if(result >= 12 && result <= 15){
                return {
                    status: "AVG",
                    msg: "Twój tekst jest przeciętny w łatwości czytania. Masz: "+result.toFixed(2)+" pkt. Przedział 'przeciętny': (lepiej) 13-15 (gorzej)"
                }
            }
            if(result < 12){
                return {
                    status: "OK",
                    msg: "Twój tekst jest łatwy do przeczytania. Masz: "+result.toFixed(2)+" pkt. Przedział 'dobry': < 12"
                }
            }
        },
        firstParagraphKeyword(){
            let p = this.pArr[0];
            let result = false;
            p = p.innerHTML.replace(/[^A-Za-z0-9ĄąĆćĘęŁłŃńÓóŚśŹźŻż]/g, '');
            
            if(p){
                let kword = this.keywordsArray.join(" ").split(" ");
                
                if(kword.length == 1){
                    result = p.toLowerCase().includes(this.keywordsArray[0].toLowerCase());
                }
                else{
                    for(let i = 0; i < kword.length; i++){
                        result = p.toLowerCase().includes(kword[i].toLowerCase());
                        break;
                    }
                }
                
            }
            if(result)return{
                status: "OK",
                msg: "Pierwszy akapit zawiera słowo kluczowe."
            }
            if(!result)return{
                status: "BAD",
                msg: "Pierwszy akapit nie zawiera słowa kluczowego."
            }
        },
        paragraphsLenght(){
            let b=0;
            let p = this.pArr;
            
            for(let i =0; i< p.length ; i++){
                if(p[i].innerText.split(" ").length > 150){
                    b++;
                }
            }
            
            if(b < 1)return {
                status: "OK",
                msg: "Nie posiadasz akapitów dłuzszych niz 150 słów. Bardzo dobrze!"
            }
            if(b>=1)return {
                status: "BAD",
                msg: "Twój tekst posiada: "+b+" akapitów dłuzszych niz 150 słów. Powinieneś to poprawić"
            }
        },
        transitonWords(){
            let transitionCount = 0;
            let words = [/\bdodatkowo\b/,/\bco więcej\b/,/\bponadto\b/,/\bmimo wszystko\b/,/\bostatecznie\b/,/\bpotem\b/,/\bpo tym\b/,/\bpotem\b/,/\bpóźniej\b/,/\bnastępnie\b/,/\baczkolwiek\b/,/\bchociaż\b/,/\bjednak\b/,/\bogólnie rzecz biorąc\b/,/\bw sumie\b/,/\bostatecznie\b/,/\bnagle\b/,/\bbez uprzedzenia\b/,/\bogólnie rzecz biorąc\b/,/\brównież\b/,/\btakże\b/,/\bteż\b/,/\bponadto\b/,/\bmimo że\b/,/\bpomimo że\b/,/\bogólnie rzecz biorąc\b/,/\bogółem\b/,/\banalogiczny do\b/,/\bkolejny\b/,/\bjeszcze jeden\b/,/\bdodatkowy\b/,/\bwłaściwie\b/,/\bw istocie\b/,/\bw efekcie\b/,/\bjako przykład\b/,/\bjak widać\b/,/\bjak zapisałem\b/,/\bjak zapisałam\b/,/\bjak powiedziałem\b/,/\bjak powiedziałam\b/,/\bjak pokazałem\b/,/\bjak pokazałam\b/,/\btak długo jak\b/,/\bo ile\b/,/\bpod warunkiem\b/,/\btak wiele jak\b/,/\btak wiele jak\b/,/\bjak pokazano powyżej\b/,/\btak szybko jak\b/,/\bjak tylko\b/,/\bjak również\b/,/\btakże\b/,/\boraz\b/,/\bzarówno\b/,/\bw każdym razie\b/,/\bna początku\b/,/\bw końcu \b/,/\bwreszcie\b/,/\bprzynajmniej\b/,/\bconajmniej\b/,/\bobszernie\b/,/\bszczegółowo\b/,/\bw chwili obecnej\b/,/\bw tym samym czasie\b/,/\brównocześnie\b/,/\bnaraz\b/,/\bw tym miejscu\b/,/\bw momencie\b/,/\bna tym etapie\b/,/\bw tym momencie\b/,/\bw porównaniu do\b/,/\bzestawione z\b/,/\bw zasadzie\b/,/\bzasadniczo\b/,/\bmniejsza o to\b/,/\bponieważ\b/,/\bdlatego że\b/,/\bbo\b/,/\bprzed\b/,/\bzanim\b/,/\bpoza tym\b/,/\bponadto\b/,/\bale\b/,/\blecz\b/,/\bjednak\b/,/\boczywiście\b/,/\bjak najbardziej\b/,/\bogólnie rzecz biorąc\b/,/\bw sumie\b/,/\bw zasadzie\b/,/\bz tych samych powodów\b/,/\bkiedy\b/,/\bdo czasu gdy\b/,/\bzanim\b/,/\bz pewnością\b/,/\bna pewno\b/,/\bzwłaszcza\b/,/\bgłównie\b/,/\bporównawczo\b/,/\bw porównaniu\b/,/\bw porównaniu do\b/,/\bjednocześnie\b/,/\brównocześnie\b/,/\bw konsekwencji\b/,/\ba co za tym idzie\b/,/\bprzekornie\b/,/\bprzeciwnie\b/,/\bodwrotnie\b/,/\bna odwrót\b/,/\bodpowiedno\b/,/\bzgodnie\b/,/\bw połączeniu z\b/,/\bmimo\b/,/\bpomimo\b/,/\binny od\b/,/\bwątpliwie\b/,/\bz powodu\b/,/\bdzięki\b/,/\bw czasie\b/,/\bpodczas\b/,/\bw trakcie\b/,/\bna przykład\b/,/\bwcześniej\b/,/\bzdecydowanie\b/,/\bstanowczo\b/,/\brówno\b/,/\bjednakowo\b/,/\brównie ważne\b/,/\bzwłaszcza\b/,/\bszczególnie\b/,/\bnawet jeśli\b/,/\bchoćby\b/,/\bchociażby\b/,/\bco więcej\b/,/\bnawet pomimo tego\b/,/\bpomimo że\b/,/\bchociaż\b/,/\bmimo że\b/,/\baczkolwiek\b/,/\bostatecznie\b/,/\bw końcu\b/,/\bwidocznie\b/,/\bnajwyraźniej\b/,/\bwyraźnie\b/,/\bdobitnie\b/,/\bw końcu\b/,/\bna koniec\b/,/\bpierwsza rzecz do zapamietania\b/,/\bpo pierwsze\b/,/\bnajpierw\b/,/\bnastępny\b/,/\bco następuje\b/,/\bna przykład\b/,/\bz obawy\b/,/\bże\b/,/\bna przykład\b/,/\bz powodu\b/,/\bponieważ\b/,/\bz tego względu\b/,/\bw przeważającym stopniu\b/,/\bw przeważającej części\b/,/\bdla celu\b/,/\bz tego samego powodu\b/,/\bz tego powodu\b/,/\bz tego powodu\b/,/\bniegdyś\b/,/\bpoprzednio\b/,/\bnatychmiast\b/,/\bniezwłocznie\b/,/\bpo czwarte\b/,/\bod czasu do czasu\b/,/\bdalszy\b/,/\bdodatkowy\b/,/\bco więcej\b/,/\bponadto\b/,/\bgeneralnie\b/,/\bogólnie\b/,/\bbiorąc pod uwagę\b/,/\bże\b/,/\bstąd\b/,/\bwięc\b/,/\bz tego powodu\b/,/\bodtąd\b/,/\bjednak\b/,/\bjednakże\b/,/\bczyli\b/,/\bto znaczy\b/,/\btzn.\b/,/\bidentycznie\b/,/\bważne by uświadomić sobie\b/,/\bjednym słowem\b/,/\bdodatkowo\b/,/\bw każdym razie\b/,/\bzresztą\b/,/\bw każdym razie\b/,/\bpokrótce\b/,/\bkrótko mówiąc\b/,/\bw sytuacji\b/,/\bw przypadku\b/,/\bna koniec\b/,/\bna zakończenie\b/,/\bw przeciwieństwie\b/,/\bszczegółowo\b/,/\bze szczegółami\b/,/\bwe właściwym czasie\b/,/\bw istocie rzeczywistości\b/,/\bw praktyce\b/,/\bw każdym przypadku\b/,/\btak czy tak\b/,/\bw gruncie rzeczy\b/,/\bzasadniczo\b/,/\bwłaściwie\b/,/\bw sumie\b/,/\bw ogóle\b/,/\bogólnie mówiąc\b/,/\bw świetle\b/,/\bw podobny sposób\b/,/\baby\b/,/\bażeby\b/,/\bżeby\b/,/\bw celu\b/,/\binnymi słowy\b/,/\bw szczególności\b/,/\bzwłaszcza\b/,/\bw rzeczywistości\b/,/\bkrótko mówiąc\b/,/\bw skrócie\b/,/\bpomimo\b/,/\bwbrew\b/,/\bw sumie\b/,/\bkrótko mówiąc\b/,/\bw skrócie\b/,/\bw takim razie\b/,/\bw takiej sytuacji\b/,/\bw końcowym rozrachunku\b/,/\bpo pierwsze\b/,/\bprzede wszystkim\b/,/\bz nadzieją że\b/,/\bw świetle\b/,/\bna dłuższą metę\b/,/\btymczasem\b/,/\bw międzyczasie\b/,/\bw ten sam sposób\b/,/\btą samą metodą\b/,/\bw tej sytuacji\b/,/\bw tej sytuacji\b/,/\bna czas\b/,/\bw porę\b/,/\bw swoim czasie\b/,/\bw rzeczywistości\b/,/\bz powodu\b/,/\bz racji\b/,/\bz uwagi na\b/,/\bdoprawdy\b/,/\bw rzeczy samej\b/,/\bzamiast\b/,/\bzamiast tego\b/,/\bostatni\b/,/\bna końcu\b/,/\bjako ostatnie\b/,/\bna koniec\b/,/\bwreszcie\b/,/\bpóźniej\b/,/\bpotem\b/,/\bażeby nie\b/,/\bw razie gdyby\b/,/\bpodobnie\b/,/\bw ten sam sposób\b/,/\bwyraźnie\b/,/\btymczasem\b/,/\bw tym czasie\b/,/\bco więcej\b/,/\bprócz tego\b/,/\bnajważniejsze\b/,/\bniemniej jednak\b/,/\bjednakże\b/,/\bniemniej jednak\b/,/\bjednakże\b/,/\bani\b/,/\bnie wspominając o\b/,/\bmimo\b/,/\btym niemniej\b/,/\bponieważ\b/,/\bw wyniku\b/,/\boczywiście\b/,/\bokazjonalnie\b/,/\bsporadycznie\b/,/\boczywiście\b/,/\bz powodu\b/,/\bna skutek\b/,/\bpo zastanowieniu\b/,/\bpo namyśle\b/,/\bpod warunkiem\b/,/\bże\b/,/\bz jednej strony\b/,/\bpod warunkiem że\b/,/\bwprost przeciwnie\b/,/\bwręcz przeciwnie\b/,/\bz drugiej strony\b/,/\bnatomiast\b/,/\bz kolei\b/,/\bogólnie\b/,/\bgeneralnie\b/,/\bjak tylko\b/,/\bkiedy\b/,/\braz na jakiś czas\b/,/\btylko\b/,/\bjeśli\b/,/\bw przeciwnym wypadku\b/,/\bw sumie\b/,/\bogólnie rzecz biorąc\b/,/\bz powodu\b/,/\bponieważ\b/,/\bszczególnie\b/,/\bw szczególności\b/,/\bniebawem\b/,/\bwkrótce\b/,/\bpoprzednio\b/,/\bprzedtem\b/,/\bprzed\b/,/\bwcześniej od\b/,/\bpod warunkiem że\b/,/\braczej\b/,/\bpomimo tego\b/,/\bmimo wszystko\b/,/\bpo drugie\b/,/\bjak na przykład\b/,/\bwkrótce\b/,/\bznacząco\b/,/\bznacznie\b/,/\bpodobnie\b/,/\bjednocześnie\b/,/\brównocześnie\b/,/\bod tego czasu\b/,/\bod\b/,/\bwięc\b/,/\bdlatego\b/,/\ba więc\b/,/\btak aby\b/,/\bpo to aby\b/,/\bjak dotąd\b/,/\bna razie\b/,/\bdo tej pory\b/,/\bpóki co\b/,/\bpod warunkiem że\b/,/\bżeby\b/,/\bpo to\b/,/\bdzięki czemu\b/,/\bwkrótce\b/,/\bniedługo\b/,/\bprędzej czy później\b/,/\bw szczególności\b/,/\bspecjalnie\b/,/\bwciąż\b/,/\bnadal\b/,/\bnatychmiast\b/,/\bod razu\b/,/\bnastępnie\b/,/\bpotem\b/,/\bpóźniej\b/,/\btaki jak\b/,/\bpodsumowując\b/,/\bz pewnością\b/,/\bna pewno\b/,/\bniewątpliwie\b/,/\bzaskakująco\b/,/\bzadziwiająco\b/,/\baniżeli\b/,/\bniż\b/,/\bto jest\b/,/\bczyli\b/,/\bto znaczy „precyzując wypowiedź"\b/,/\bnastępnie\b/,/\bpotem\b/,/\bzatem\b/,/\bz drugiej strony\b/,/\bjednak\b/,/\bjednagże\b/,/\bpotem\b/,/\bnastępnie\b/,/\bpóźniej\b/,/\bdlatego\b/,/\bzatem\b/,/\bbezzwłocznie\b/,/\bw związku z tym\b/,/\bw wyniku czego\b/,/\bpo trzecie\b/,/\btym razem\b/,/\bpomimo że\b/,/\bchociaż\b/,/\bmimo że\b/,/\baczkolwiek\b/,/\bstąd\b/,/\btak więc\b/,/\bdlatego\b/,/\bpóki nie\b/,/\bdopóki nie\b/,/\bwprawdzie\b/,/\bz pewnością\b/,/\bniewątpliwie\b/,/\bnajpierw\b/,/\bpoczynając od\b/,/\bwspólnie z\b/,/\bw dodatku do\b/,/\brazem z\b/,/\bbezspornie\b/,/\bniewątpliwie\b/,/\bniewątpliwie\b/,/\bbez wątpienia\b/,/\bjeśli nie\b/,/\bchyba że\b/,/\bnie tak jak\b/,/\bw przeciwieństwie do\b/,/\bniewątpliwie\b/,/\bbezsprzecznie\b/,/\bpóki nie\b/,/\bdopóki nie\b/,/\bdotychczas\b/,/\bdo tej pory\b/,/\bw obliczu\b/,/\bw związku z\b/,/\bco więcej\b/,/\bw momencie kiedy\b/,/\bpodczas gdy\b/,/\bilekroć\b/,/\bkiedy tylko\b/,/\bpodczas gdy\b/,/\bnatomiast\b/,/\bbez wątpienia\b/,/\bbez zwłoki\b/,/\bbezzwłocznie\b/,/\bbez wątpienia\b/,/\bbez ograniczeń\b/,/\bbez zastrzeżeń\b/];
            let sentencesString = this.sentencesString;
            sentencesString = sentencesString.toLowerCase();
            let sA = sentencesString.split('{|}');
            for(let i = 0; i < sA.length; i++){
                for(let j = 0; j < words.length; j++){
                    if(sA[i].search(words[j]) != -1){
                        transitionCount++;
                        break;
                    }
                }
            }
            let procent = transitionCount/this.sentencesArr.length * 100;
            procent = procent.toFixed(2);
            if(procent >= 30){
                return {
                    status: "OK",
                    msg: "Ten wpis ma ponad 30% słów zwiększających czytelność tekstu ("+procent+"%). To dobry wynik dla SEO!"
                }
            }
            
            if(procent >= 20 && procent < 30){
                return  {
                    status: "AVG",
                    msg: "Twój wpis ma między 20% a 30%  pokrycia tekstu słowami zwiększającymi czytelność ("+procent+"%). Ten wynik mógłby być lepszy -  popracuj nad tym!"
                }
            }
            if(procent < 20){
                return {
                    status: "BAD",
                    msg: "Twój tekst ma ponizej 20% pokrycia tekstu słowami zwiększającymi czytelność ("+procent+"%). To słaby wynik, popraw go koniecznie!"
                }
            }
        },
        headingsTest(){
            let h1,h2,h3,h4;
            h1=h2=h3=h4=0;
            // h1 = (this.h1Arr.length > 0 )? 1:0;
            h2 = (this.h2Arr.length > 0 )? 1:0;
            h3 = (this.h3Arr.length > 0 )? 1:0;
            h4 = (this.h4Arr.length > 0 )? 1:0;
            var sum= h2+h3+h4;
            if(sum <= 1){
                return {
                    status: "BAD",
                    msg: "Masz tylko "+sum+" rodzajów nagłówków. Rozważ zmianę, tak aby był przynajmniej jeden h2 oraz jeden h3 lub h4"
                }
            }
            else if(sum == 2 && h2 == 0){
                return {
                    status: "AVG",
                    msg: "Masz "+sum+" rodzaje nagłówków nagłówków, ale żandego h2. Rozważ dodanie nagłówka h2 i lepszą strukturyzację tekstu."
                }
            }
            else if(sum >= 2){
                return {
                    status: "OK",
                    msg: "Posiadasz kilka rodzajów nagłówków, bardzo dobrze!"
                }
            }
        },
        headingsToParagraphs(){
            let sumh = this.h1Arr.length + this.h2Arr.length+this.h3Arr.length+this.h4Arr.length;
            let sump = this.pArr.length;
            
            let result = sumh/sump;
            if(result < 0.25 || result >= 0.80){
                return {
                    status: "BAD",
                    msg: "Twój stosunek nagłówków do akapitów jest zły. Pownien być większy niz 0.25 i mniejszy niz 0.80 ("+result.toFixed(2)+")"
                }
            }
            
            if(result >= 0.25 && result < 0.80){
                return {
                    status: "OK",
                    msg: "Twój stosunek nagłówków do akapitów jest dobry - nie przekracza 0.80 i nie spada ponizej 0.25 ("+result.toFixed(2)+")"
                }
            }
        },
        insideLinks(){
            let links = this.aArr;
            let b = 0;
            
            for(let i = 0; i < links.length; i++){
                if(!links[i].href || links[i].href == undefined || links[i].href=="" || links[i].href=="undefined") break;

                if(
                    links[i].href.toLowerCase().includes(this.domain.toLowerCase()) 
                    || 
                    (
                        !links[i].href.toLowerCase().includes('http://') 
                            && 
                        !links[i].href.toLowerCase().includes('https://')
                    )
                ){
                    b++;
                } 
            }
            if(b == 0 ){
                return {
                    status:"BAD",
                    msg: "Twój tekst nie posiada linków wewnętrznych!"
                }
            }
            if(b == 1 ){
                return {
                    status:"AVG",
                    msg: "Twój tekst posiada "+b+" link wewnętrzny!"
                }
            }
            if(b > 1 ){
                return {
                    status:"OK",
                    msg: "Twój tekst posiada "+b+" linków wewnętrznych!"
                }
            }
        }
        
    }
}
</script>