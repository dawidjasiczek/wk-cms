<template>
    <div class="wk-editor">
        <div class="wk-editor__content wk-editor-custom-styles">
            <div class="wk-editor__placeholder" v-if="blocks.length == 0">
                <div class="icon">
                    <fa-icon icon="times" />
                </div>
                <div>
                    Nic tu jeszcze nie ma, dodaj jakąś treść do tworzonego dokumentu wybierając opcję z panelu po prawej stronie
                </div>
            </div>
            <transition-group tag="div" name="dashboard-table">
           
                    <div class="" v-for="(block, ix) in blocks" :key="block.c_id">
                        <div class="wk-editor__block">
                            <div class="wk-editor__block-controls shadow">
                                <div class="mb-1-2">
                                    <button v-if="block.type != 'table'" class="btn btn--secondary btn--sm" @click="handleEditBlock(block.c_id)"><fa-icon icon="edit"/></button>
                                    <button :class="{
                                    'ml-1-2': block.type != 'table'
                                    }" class=" btn btn--danger btn--sm" @click="confirmDeleteBlock(block.c_id)"><fa-icon icon="trash"/></button>
                                </div>
                                <div>
                                    <button 
                                    class="btn btn--info btn--sm" 
                                    @click="moveBlock(block.c_id, 'up')"
                                    :disabled="(ix == 0)"><fa-icon icon="arrow-up"/></button>
                                    <button 
                                    class="ml-1-2 btn btn--info btn--sm" 
                                    :disabled="(ix == (blocks.length -1))"
                                    @click="moveBlock(block.c_id, 'down')"><fa-icon icon="arrow-down"/></button>
                                </div>
                            </div>
                            <template v-if="block.type == 'text'">
                                <div v-html="block.content"></div>
                            </template>
                            <template v-if="block.type == 'iframe'">
                                <div v-html="block.content"></div>
                            </template>
                            <template v-if="block.type == 'image'">
                                <figure>
                                    <img :src="$store.state.frontUrl+block.image" :alt="block.alt" class="wk-editor__block-img">
                                    <figcaption>{{block.caption}}</figcaption>
                                </figure>
                            </template>
                            <template v-if="block.type == 'table'">
                                <WkTableEditor :value="block.content" @data-update="(t)=> editTableBlock(t, block.c_id)" ></WkTableEditor>
                            </template>
                        </div>
                    </div>
                
                
            </transition-group>
        </div>
        <div class="wk-editor__panel">
            <div class="wk-editor__sticky" ref="sticky" @mousedown="startDrag($event)">
            <!-- <div class="wk-sticky-trigger">
                <button class="btn btn-primary" title="Przenieś panel kontrolny">
                <fa-icon icon="arrows-alt" />
                </button>
            </div>
            <div class="wk-sticky-untrigger">
                <button @click="unfixPanel()" class="btn btn-danger" title="Zamknij panel">
                <fa-icon icon="times" />
                </button>
            </div> -->
                <div @mousedown.stop @click="textModal = true; textModalMode = 'new'; textModalEditingIndex = ''" class="wk-editor__newtextblock new-block-btn">
                    <div class="icon">
                    <fa-icon icon="heading" />
                    </div>
                    <div class="text">
                    <!-- <fa-icon icon="plus-square" /> -->
                     Dodaj tekst
                    </div>
                </div>
                <div @mousedown.stop @click.stop="imageModal = true; imageModalMode = 'new'; imageModalEditingIndex = ''" class="wk-editor__newimageblock new-block-btn">
                    <div class="icon">
                    <fa-icon icon="image" />
                    </div>
                    <div class="text">
                        Dodaj obraz
                        <!-- <fa-icon icon="plus-square" /> Dodaj obraz -->
                    </div>
                </div>
                <div @mousedown.stop @click.stop="iframeModal = true; iframeModalMode = 'new'; iframeModalEditingIndex = ''" class="wk-editor__newiframeblock new-block-btn">
                    <div class="icon">
                    <fa-icon icon="laptop-code" />
                    </div>
                    <div class="text">
                    <!-- <fa-icon icon="plus-square" /> Dodaj iframe -->
                    Dodaj iframe
                    </div>
                </div>
                <div v-if="table" @mousedown.stop @click.stop="addBlock('table')" class="wk-editor__newiframeblock new-block-btn">
                    <div class="icon">
                    <fa-icon icon="table" />
                    </div>
                    <div class="text">
                    <!-- <fa-icon icon="plus-square" />  -->
                    Dodaj tabelę
                    </div>
                </div>
            </div>
        </div>
        <WkModal @confirm="(textModalMode == 'new')? addBlock('text'):editBlock('text')" :show="textModal" size="big" confirmButtonType="success" :confirmButtonText="((textModalMode == 'new')? 'Dodaj':'Zapisz zmiany')" @cancel="textModal = false;">
            <h3>{{(textModalMode == 'new')? 'Nowy blok z tekstem' : 'Edytuj blok z tekstem'}}</h3>
            <WkWysiwyg v-model="textModalEditor" :allowImages="wyswigAllowImages"></WkWysiwyg>
        </WkModal>
        <WkModal @confirm="(iframeModalMode == 'new')? addBlock('iframe'):editBlock('iframe')" :show="iframeModal" size="big" confirmButtonType="success" :confirmButtonText="((iframeModalMode == 'new')? 'Dodaj':'Zapisz zmiany')" @cancel="iframeModal = false">
            <h3>{{(iframeModalMode == 'new')? 'Nowy blok z iframe' : 'Edycja bloku iframe'}}</h3>
            <p>Proszę wstawić cały bloczek iframe! Razem z tagami &#x3c;iframe&#x3e; oraz &#x3c;/iframe&#x3e;</p>
            <WkInput type="textarea" v-model="iframeModalContent" label="Kod z ramki iframe"></WkInput>
        </WkModal>
        <WkModal @confirm="(imageModalMode == 'new')? addBlock('image'):editBlock('image')" :show="imageModal"  confirmButtonType="success" :confirmButtonText="((imageModalMode == 'new')? 'Dodaj':'Zapisz zmiany')" 
        @cancel="imageModal = false; filemanager_show=false; filemanager_file=null" >
            <WkRow class="mt-1">
                <WkCol xs="12" sm="8"><h3 class="py-0 my-0">{{(imageModalMode == 'new')? 'Nowy obrazek' : 'Zmiana obrazka'}}</h3></WkCol>
                <WkCol xs="12" sm="4"><WkButton size="sm" color="info" @click="filemanager_show = true">Wybierz obrazek</WkButton></WkCol>
            </WkRow>
            <!-- <div class="dashboard-grid mb-1">
                <div class="dashboard-grid__column dashboard-grid__column--2">
                    
                </div>
                <div class="dashboard-grid__column dashboard-grid__column--2 text--right  dashboard-grid__column--middle">
                    <button class="btn btn--info btn--sm" @click="filemanager_show = true">Wybierz obrazek</button>
                </div>
            </div> -->
            <div >
                <img class="mx-auto"  style="max-height: 200px; display:block;" v-if="filemanager_file" :src="(filemanager_file)? $store.state.frontUrl+filemanager_file: ''">
            </div>
            <WkFileManager 
            :show="filemanager_show" 
            @close="filemanager_show=false; 
            filemanager_file=null" 
            @selected-file="(f)=>{filemanager_file = f.entry_path; filemanager_show=false}" 
            isNode
            />
            <WkInput class="mt-1" type="text" v-model="imageModalAlt" label="Tekst alternatywny" />
            <WkInput class="mt-1" type="text" v-model="imageModalCaption" label="Podpis zdjęcia" />
        </WkModal>
        <WkModal @confirm="deleteBlock" :show="confirmDelete"  confirmButtonType="danger" confirmButtonText="Usuń" @cancel="confirmDelete=false; block_to_delete= ''">
            <h3>Czy napewno chcesz usunąć?</h3>
        </WkModal>
    </div>
		
</template>
<script>
export default {
	data(){
        return{
            confirmDelete: false,
            block_to_delete: '',

            timer: null,

            
            //TEXT MODAL
            tableModal: false,
            tableModalContent: [],
            tableModalMode: 'new',
            tableModalEditingIndex: "",
            //TEXT MODAL
            textModal: false,
            textModalEditor: '',
            textModalMode: 'new',
            textModalEditingIndex: "",

            //IFRAME MODAL
            iframeModal: false,
            iframeModalContent: '',
            iframeModalMode: 'new',
            iframeModalEditingIndex: "",

            //IMAGE MODAL
            imageModal: false,
            imageModalMode: 'new',
            imageModalAlt: "",
            imageModalCaption: "",
            imageModalEditingIndex: "",

            filemanager_show: false,
            filemanager_file: null,
            blocks: []
        }
		
    },
    props:{
        debounce:{
            type: Boolean,
            default: false
        },
        table:{
            type: Boolean,
            default: false
        },
        debounceTime:{
            type: Number,
            default: 5000
        },
        value: {
            type: Array,
            default: ()=>{
                return [];
            }
        },
        wyswigAllowImages: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        value(){
            
            this.blocks = this.value;
        }
    },
    methods: {
        clearModals(){
            this.textModal = false;
            this.textModalEditor = '';
            this.textModalMode = 'new';
            this.textModalEditingIndex = "";
            this.iframeModal =  false;
            this.iframeModalContent =  '';
            this.iframeModalMode = 'new';
            this.iframeModalEditingIndex = "";
            this.imageModal = false;
            this.imageModalMode = 'new';
            this.imageModalAlt = "";
            this.imageModalCaption = "";
            this.imageModalEditingIndex = "";
            this.filemanager_file = null;
            this.filemanager_show = false;
        },
        addBlock(type){
            const block = {};
            if(type === "text"){
                block.type = "text";
                block.content = this.textModalEditor;
                block.c_id = "textblock_"+(+new Date())+Math.random() * 100000
                

            }
            else if(type === "table"){
                block.type = "table";
                block.content = [['Nagłówek 1', 'Nagłówek 2'], ["", ""]];
                block.c_id = "table_"+(+new Date())+Math.random() * 100000
            }
            else if(type === "iframe"){
                block.type = "iframe";
                block.content = this.iframeModalContent;
                block.c_id = "iframeblock_"+(+new Date())+Math.random() * 100000
                

            }
            else if(type === "image"){
                if(!this.filemanager_file){
                    this.$alert({type: "danger", msg: "Brak obrazka"})
                    return;
                }
                block.type = "image";
                block.content = this.imageModalAlt;
                block.caption = this.imageModalCaption;
                block.image = this.filemanager_file;
                block.c_id = "imageblock_"+(+new Date())+Math.random() * 100000

                
            }
            this.clearModals()
            this.blocks.push(block);
             this.$emit('content-add', {
                item: block
            });
            this.updateContent()
        },
        editTableBlock(table, c_id){
            const ix = this.blocks.findIndex((_)=> _.c_id === c_id)
            if(ix == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 508]"})
                return;
            }
            this.blocks[ix].content = table;

            this.$emit('content-edit', {
                item: this.blocks[ix]
            });
            this.updateContent()
        },
        handleEditBlock(c_id){
            const ix = this.blocks.findIndex((_)=> _.c_id === c_id)
            if(ix == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 503]"})
                return;
            }
            
            const block = this.blocks[ix]
            if(block.type == 'text'){
                this.textModal= true;
                this.textModalEditor = block.content;
                this.textModalMode = 'edit';
                this.textModalEditingIndex = ix;
            }
            if(block.type == "iframe"){
                this.iframeModal = true;
                this.iframeModalContent = block.content;
                this.iframeModalMode = 'edit';
                this.iframeModalEditingIndex= ix;
            }
            if(block.type == "image"){
                this.imageModalMode = 'edit';
                this.imageModal = true;
                this.imageModalAlt = block.content;
                this.imageModalCaption = block.caption;
                this.filemanager_file =  block.image;
                this.imageModalEditingIndex= ix;
            }
            
        },
        editBlock(type){
            if(type == "text"){
                this.blocks[this.textModalEditingIndex].content = this.textModalEditor;
                this.textModal = false;
                this.$emit('content-edit', {
                    item: this.blocks[this.textModalEditingIndex]
                });
            }
            if(type == "iframe"){
                this.blocks[this.iframeModalEditingIndex].content = this.iframeModalContent;
                this.iframeModal = false;
                this.$emit('content-edit', {
                    item: this.blocks[this.iframeModalEditingIndex]
                });
            }
            if(type == "image"){
                this.blocks[this.imageModalEditingIndex].content = this.imageModalAlt;
                this.blocks[this.imageModalEditingIndex].caption = this.imageModalCaption;
                this.blocks[this.imageModalEditingIndex].image = this.filemanager_file;
                this.imageModal = false;
                this.$emit('content-edit', {
                    item: this.blocks[this.imageModalEditingIndex]
                });
            }
            
            this.updateContent();
            this.clearModals();
        },
        moveBlock(c_id, direction){
            const ix = this.blocks.findIndex((_)=> _.c_id === c_id)
            if(ix == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 203]"})
                return;
            }
            let newIndex = -1;
            if(direction == "down"){
                if(ix == this.blocks.length-1){
                    this.$alert({type: "info", msg: "Element jest już ostatni"})
                    return;
                }
                newIndex = ix+1;
            }else if(direction == "up"){
                if(ix == 0){
                    this.$alert({type: "info", msg: "Element jest już pierwszy"})
                    return;
                }
                newIndex = ix-1;
            }
            if(newIndex == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 204]"})
                return
            }
            this.swap(this.blocks, ix, newIndex)
            this.$emit('content-move', {
                item1: this.blocks[ix].c_id,
                item2: this.blocks[newIndex].c_id
            });
            this.updateContent();
        },
        swap(arr, x, y) {
        let t = arr[x];
        arr[x] = arr[y];
        arr.splice(y, 1, t);
        },
        deleteBlock(){
            if(this.block_to_delete == "" ){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 301]"})
                return;
            }
            const ix = this.blocks.findIndex((_)=> _.c_id === this.block_to_delete)
            if(ix == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [EDITOR 302]"})
                return;
            }
            
            this.block_to_delete = "";
            this.confirmDelete = false;
            this.$emit('content-delete', {
                item: this.blocks[ix].c_id,
            });
            this.blocks.splice(ix, 1);
            this.updateContent()
        },
        confirmDeleteBlock(c_id){
            this.confirmDelete = true;
            this.block_to_delete = c_id;
        },
        updateContent(){
            if(this.debounce && this.debounceTime >= 1){
                if(this.timer != null) clearTimeout(this.timer) 

                this.timer = setTimeout(()=>{
                    this.$emit("content-updated", this.blocks);
                    this.timer = null;
                }, this.debounceTime);
            }else{
                this.$emit("content-updated", this.blocks);
            }
            
            
        }
    },
    mounted(){
        this.blocks = this.value;
    }
}
</script>