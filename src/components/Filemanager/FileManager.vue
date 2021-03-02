<template>
    <div class="wkfm">
        <div class="wkfm-modal" v-if="show">
            
            <div class="wkfm-modal__container">

                    <div class="wkfm-alert__wrapper">
                        <transition name="alert">
                        <div class="wkfm-alertbar" v-if="alert.show"
                            :class="{
                                'danger': (alert.type=='danger')? true:false,
                                'info': (alert.type=='info')? true:false,
                                'success': (alert.type=='success')? true:false

                            }">
                            <div class="wkfm-alertbar__container">
                                <div class="wkfm-alertbar__text">
                                    {{alert.text}}
                                </div>
                                 <button class="wkfm-alertbar__btn btn " @click="alert.show = false"><fa-icon icon="times"></fa-icon></button>
                            </div>
                        </div>
                        </transition>
                    </div>
      
                <transition name="opacity">
                <div v-if="additional_modal.show" class="wkfm-additional-modal" @dragover.prevent @drop.prevent>
                    <div class="wkfm-additional-modal__container" ><div class="wkfm-additional-modal__container2">
                        <h3>{{additional_modal.title}}</h3>
                        <div class="wkfm-additional-modal__content">
                            <template  v-if="additional_modal.input">
                                <wk-fminputs @enter-pressed="additionalModalEnterPressed" ref="modal_input" :entry="open_entry" v-model="additional_modal.input_value" />
                            </template>
                            <template v-if="additional_modal.dropzone">
                                                                <div class="wkfm-additional-modal__dropzone"  @drop="handleFileDrop"  @click="$refs['file-input'].click()">
                                <p class="wkfm-additional-modal__dropzone-text">Kliknij lub przeciągnij by wybrać pliki do przesłania</p>
                                <input type="file" 
                                ref="file-input" name="wkfm-additional-modal__file-input"
                                    multiple="True" @change="handleFileInput">
                                </div>
                                <div   class="wkfm-additional-modal__filelist">
                                    <h5 v-if="!progressbar.show">Wybrane pliki ({{files.length}}): </h5>
                                    <ul v-if="!progressbar.show">
                                        <li v-for="(file, index)  in files" :key="index">
                                        <button @click="removeFile(index)"
                                            title="Usuń" class="wkfm-additional-modal__filelist__deletebtn btn btn--danger "><fa-icon icon="times" /></button>
                                        {{ file.name }} ({{ file.size }} b)
                                        
                                    </li>
                                    </ul>
                                    <div class="wkfm-progressbar" v-if="progressbar.show">
                                        <div class="wkfm-progressbar__contener">
                                            <div class="wkfm-progressbar__bar" :style="{'width': (progressbar.value*100)+'%'}" ref="modal_progressbar"></div>
                                        </div>
                                        <div class="wkfm-progressbar__percent" >
                                            {{Math.ceil(progressbar.value.toFixed(2)*100)}}%
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="additional_modal.move">
                                <div class="wkfm-additional-modal__dirlist">
                                    <WkSelect 
                                    textProp="text" 
                                    valueProp="value" 
                                    :options="onlyDirs" 
                                    v-model="additional_modal.move_target_dir" label="Wybierz folder" />
                                </div>
                            </template>
                            

                        </div>
                        <div class="wkfm-additional-modal__controls">
                            <WkButton @click="handleModalConfirm" 
                            :color="((additional_modal.invertedColors == true)? 'danger':'success')"
                            :loading="loading"
                            >{{additional_modal.confirmTxt}} </WkButton>

                            <WkButton @click="handleModalClose" 
                            :color="((additional_modal.invertedColors == true)? 'success':'danger')"
                            >{{additional_modal.closeTxt}}</WkButton>
                        </div>
                    </div>
                </div>
                </div>
                </transition>
                <div class="wkfm-nav" >
                    <div class="wkfm-nav__grid">
                        <WkButton @click="oneDirBack" color="primary"><fa-icon icon="arrow-up"></fa-icon></WkButton>
                        <div class="wkfm-path"  id="path">
                            <div class="wkfm-path__item" v-for="(h_item, index) in showHistory" :key="index">
                                <div class="btn" 
                                @click="goToDir(h_item.index)"
                                :class="{'btn--warning': !is3DotsInPath(h_item.name), 'wkfm-path__3dots': is3DotsInPath(h_item.name)}">{{h_item.name}}
                            </div>
                            </div>
                        </div>
                        <WkButton color="primary" @click="list_mode = !list_mode"><fa-icon v-if="!list_mode" icon="list" /><fa-icon v-if="list_mode" icon="th" /></WkButton>
                    </div>
                    <div class="wkfm-nav__grid btns_distance">
                         <WkButton @click="optionClicked({option: {slug: 'mkdir'}})" ><fa-icon icon="folder"></fa-icon><span v-if="!smallMode">Nowy folder</span></WkButton>

                        <WkButton  @click="openFileUploadModal" color='primary'><fa-icon icon="file-upload"></fa-icon><span  v-if="!smallMode">Prześlij pliki</span></WkButton>

                        <WkButton color="danger" @click="emitClose"><fa-icon icon="times"></fa-icon></WkButton>
                    </div>
                </div>
                <div class="wkfm-content">
                    <div class="wkfm-egrid" :class="{list_mode: list_mode}" ref="container" >
                    
                        <wk-entry
                        :list_mode="list_mode"
                        v-for="entry in entries"
                        :class="{'selected': (entry.entry_path == open_entry.entry_path)? true:false}"
                        :entry="entry"
                        :key="entry.entry_path+entry.entry_size"
                        @open_dir="openDir"
                        @open_info="openInfobar"
                        @right_click="handleOpenEntryContextMenuClick"
                        />
                        
                        <ext-intersect  @enter="handleIntersectEnter"
                            @leave="handleIntersectLeave"
                            v-if="!is_loading"
                            :root="$refs['container']"
                            :threshold="[0]"
                        >
                            <div class="intersect" style="height: 10px;"></div>
                        </ext-intersect>
                    </div> 

                </div>
                <transition name="fm_animation">
                <wk-infobar 
                :show="showInfobar"
                :showConfirm="true" 
                :showClose="true"
                :confirmBtnText="(open_entry.entry_type == 'dir')? 'Otwórz folder':'Wybierz'"
                v-on:cancel="closeInfobar"
                v-on:confirm="confirmInfobar"
                >
                    <div class="wkfm-ibar-content__namec">
                        <wk-fminputs ref="ename" @enter-pressed="infobarEnterPressed" v-if="open_entry.name_edit_mode" :entry="open_entry"  class="wkfm-ibar-content__name--input" v-model="open_entry.entry_plainname" />
                        
                        <div  class="wkfm-ibar-content__name">
                        <h3  v-if="!open_entry.name_edit_mode">{{open_entry.entry_plainname}} </h3>
                        <WkButton v-if="!open_entry.name_edit_mode" classes="btn btn--warning wkfm-ibar-content__cbutton" @click="infobarOpenEditMode">
                            <fa-icon icon="pencil-alt"></fa-icon>
                        </WkButton>
                        <WkButton v-if="open_entry.name_edit_mode" classes="btn btn--success wkfm-ibar-content__cbutton" @click="renameEntry(false)">
                            <fa-icon   icon="check"></fa-icon>
                        </WkButton>
                        <WkButton v-if="open_entry.name_edit_mode" classes="btn btn--danger wkfm-ibar-content__cbutton" @click="infobarCloseEditMode">
                            <fa-icon icon="times"></fa-icon>
                        </WkButton>
                        </div>
                        
                    </div>
                    <p>{{open_entry.name}}</p>
                </wk-infobar>    
                </transition>  

                <WkContextMenu
                    elementId="context_menu"
                    :options="entryContextMenuOptions"
                    :ref="'entryContextMenu'"
                    @option-clicked="optionClicked"
                />
            </div>
        </div>

    </div>
    
</template>

<script>



import Intersect from 'vue-intersect'
import wkEntry from './FileManager-Entry'
import wkFmInputs from './FileManager-Inputs'
import wkInfobar from './FileManager-Infobar'


import {FileContextMenuOptions, WhiteContextMenuOptions, DirContextMenuOptions, file_name_reg, dir_name_reg} from './const'


export default {
    data() {
        return{
            progressbar:{
                show: false,
                value: 0
            },
            smallMode: false,
            list_mode: false,
            entries: [],
            page: 1,
            areEntries: true,
            path_history: [],
            path: "",
            is_loading: false,
            queue: [],
            showInfobar: false,
            open_entry: {},
            loading: false,
            additional_modal: {
                show: false,
                title: "Tytuł",
                slug: "",
                confirmTxt :"Zatwierdź",
                closeTxt: "Anuluj",
                invertedColors: false,
                input: false,
                input_value: "",
                dropzone: false,
                move: false,
                move_target_dir: ""
            },
            entryContextMenuOptions: [],
            files: [],
            alert: {
                show: false,
                type: 'info',
                text: ""
            }
        }
    },
    props: {
        maxFileSize: {
            type: Number,
            default: 10485760
        },
        show: {
            type: Boolean,
            default:  false
        },
        prefix: {
            type: String,
            default:  "files"
        },
        mimeTypeFilter: {
            type: Array,
            default: function () {
                return ['*']
            }
        },
        allowedMimetypes: {
            type: Array,
            default: function () {
                return ['*']
            }
        },
        isNode: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        showHistory(){
            if(this.path_history.length<4){
                let a = [{name: "/", index: 0}];
                for (let i = 1; i < this.path_history.length; i++) {
                     a.push({
                    name: this.path_history[i]+"/", 
                    index: i
                    })
                    
                }
                return a
            }else{
                return [
                {
                    name: this.path_history[0], 
                    index: 0
                },
                {
                    name: "...", 
                    index: -1
                }, 
                {
                    name: this.path_history[this.path_history.length-2]+"/", 
                    index: this.path_history.length-2
                }, 
                {
                    name: this.path_history[this.path_history.length-1]+"/", 
                    index: this.path_history.length-1
                }
                ]
            }
        },
        onlyDirs(){
            
            const a = []
            if(this.path_history.length > 1){
                a.push({
                    text: this.path_history[this.path_history.length -2],
                    value: 'one-back',
                })
            }
            
            for (let i = 0; i < this.entries.length; i++) {
                const element = this.entries[i];
                if(element.entry_type == "dir") a.push({ value:element.entry_name, text: element.entry_name})
            }
            return a;
        }
        
        
    },
    mounted() {
        this.openDir("/"),
        this.onResize();
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    methods: {
        isInAllowedMimetypes(file){
            if(file.entry_type == "dir"){
                return true;
            }
            const mime = file.entry_mimetype;
            if(this.allowedMimetypes.findIndex(_ => _ == "*") >= 0){
                return true;
            }

            
            const file_left = mime.split("/")[0]
            const file_right =  mime.split("/")[1]
            //console.log(file_left, file_right)
            
            for (let i = 0; i < this.allowedMimetypes.length; i++) {
                const aM = this.allowedMimetypes[i];
                const aM_left = aM.split("/")[0];
                const aM_right = aM.split("/")[1];

                if(aM_left == file_left || aM_left == "*"){
                    if(aM_right == file_right || aM_right == "*"){
                        return true;
                    }
                }
            }
            
            return false;
            
        },
        confirmInfobar(){
            if(this.open_entry.entry_type == "dir"){
                this.openDir(this.open_entry.entry_name)
            }else if(this.open_entry.entry_type == "file"){
                if(this.isInAllowedMimetypes(this.open_entry)){
                    this.$emit('selected-file', this.open_entry)
                    
                }else{
                    this.handleAlert({type: 'danger', text: 'Niedozwolony typ pliku'})
                }
                 
            }else{
                this.handleAlert({type: 'danger', text: 'Spróbuj ponownie'})
            }
        },
        onResize() {
            if(window.innerWidth <= 600){
                this.smallMode = true;
            }else{
                this.smallMode = false
            }
        },
        is3DotsInPath(x){
            if(x == "..."){
                return true
            }else{
                return false
            }
        },
        handleIntersectEnter(){
            //console.log('ENTER')
            if(this.is_loading) this.queue.push('fetchData');
            else this.fetchData();
        },
        handleIntersectLeave(){
            //console.log('LEAVE')
            this.queue = [];
        },
        isRoot(){
            //console.log(this.path_history)
            if(this.path_history.length == 1 && this.path_history[0] == "/"){
                //console.log("already root")
                return true
            }else{
                return false
            }
        },
        clearVariables(){
            this.open_entry = {}
            this.entries = []
            this.page = 1;
            this.areEntries = true;
            this.queue = [];
            this.is_loading = false;
        },
        setPathFromHistory(){
            this.path = this.path_history.join("/").substring(1)
        },
        openDir(data){
            this.clearVariables()
            this.path_history.push(data)
            this.setPathFromHistory()
            this.fetchData()
            this.closeInfobar();

        },
        openInfobar(path){
            const ix = this.entries.findIndex(_ => _.entry_path == path);
            if(ix === -1) return;
            this.open_entry = this.entries[ix];
            this.open_entry.name_edit_mode = false;
            this.showInfobar = true;
            //console.log(data)
        },
        closeInfobar(){
            
            this.showInfobar = false;
            this.open_entry = {};
            
            
        },
        infobarOpenEditMode(){
            this.open_entry.old_name = this.open_entry.entry_plainname
            this.open_entry.name_edit_mode = true
        },
        infobarCloseEditMode(){
            this.open_entry.name_edit_mode = false;
            this.open_entry.entry_plainname = this.open_entry.old_name
        },
        infobarEnterPressed(){
            this.renameEntry(false)
        },
        async additionalModalEnterPressed(){
            if(this.additional_modal.slug == "rename"){
                await this.renameEntry(this.$refs.modal_input.value);
            }else if(this.additional_modal.slug == "mkdir"){
                await this.createDir();
            }
            this.additional_modal.show = false;
        },
        //-------ENTRIES FUNCTIONS -------////
        
        async renameEntry(newName){
            if(this.loading == true) return;
            
            if(newName === false){
                newName = this.$refs.ename.value
            }
            if(this.open_entry.entry_type == "dir"){
                if(!dir_name_reg.test(newName) || newName == ".."){
                    this.handleAlert({type:'danger', text:'Niewłaściwa nazwa pliku'})
                    return
                }
            }else{
                if(!file_name_reg.test(newName) || newName == ".."){
                    this.handleAlert({type:'danger', text:'Niewłaściwa nazwa pliku'})
                    return
                }
            }
            const oldName = this.open_entry.entry_name;
            this.loading = true;

            try {
                let r = await this.$axios.$post(`/filemanager/`+this.prefix+`/rename/`, {
                    name: this.open_entry.entry_name,
                    path: this.path+"/",
                    new_plainname: newName
                }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });

                const ix = this.entries.findIndex(_ => _.entry_name == oldName);
                this.open_entry.name_edit_mode = false;
                
                if(ix === -1) return;
                this.entries[ix].entry_mod_date = r.entries.entry_mod_date
                this.entries[ix].entry_name= r.entries.entry_name
                this.entries[ix].entry_plainname = r.entries.entry_plainname
                this.entries[ix].entry_size = r.entries.entry_size
                this.handleAlert({type:'success', text:'Zmieniono nazwę' })
            } catch(e) {}

            this.loading = false;
        },
        async deleteFileEntry(){
            if(this.loading == true) return;

            this.loading = true;
            const oldName = this.open_entry.entry_name;          

            try {
                let r = await this.$axios.$delete(`/filemanager/`+this.prefix+`/remove_file/?name=`+this.open_entry.entry_name+"&path="+this.path+"/", {
                    headers: {
                        'content-type': 'application/json'
                    }
                });                
                const ix = this.entries.findIndex(_ => _.entry_name == oldName);
                if(ix === -1) return;
                this.entries.splice(ix, 1);
                this.handleAlert({type:'success', text:'Usunięto plik '})
            } catch(e) {}

            this.loading = false;
        },
        async deleteDirEntry(){
            if(this.loading == true) return;
            this.loading = true;
            const oldName = this.open_entry.entry_name;
            const  p = this.path+"/"+this.open_entry.entry_name+"/";

            try {
                let r = await this.$axios.$delete('/filemanager/'+this.prefix+'/rmdir/?path='+p, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                
                const ix = this.entries.findIndex(_ => _.entry_name == oldName);
                if(ix === -1) return;
                this.entries.splice(ix, 1);
                this.handleAlert({type:'success', text:'Usunięto folder '})
            } catch(e) {}

            this.loading = false;
        },
        async createDir(){
            if(this.loading == true) return;
            const name = this.$refs.modal_input.value;
            
            if(!dir_name_reg.test(name) || name == ".."){
                this.handleAlert({type:'danger', text:'Niewłaściwa nazwa folderu'})
                return
            }
            this.loading = true;
            try {
                let r = await this.$axios.$post('/filemanager/'+this.prefix+'/mkdir/', {
                    name:  name,
                    path: this.path+"/",
                }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                this.entries.unshift(r.entries)
                
                this.handleAlert({type:'success', text:'Stworzono folder'})
            } catch(e) {}
            this.loading = false;
        },
        async Move(){
            if(this.loading == true) return;


            this.loading = true;
            const oldName = this.open_entry.entry_name;
            let p = this.path+"/"+this.additional_modal.move_target_dir
            if(this.additional_modal.move_target_dir == "one-back"){
                p = this.path_history.slice(0, this.path_history.length-1).join('/');
            }

            const q = {
                name: this.open_entry.entry_name,
                path: this.path+"/",
                new_path: p
            }

            try {
                let r = await this.$axios.$post('/filemanager/'+this.prefix+'/move/',  q, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                const ix = this.entries.findIndex(_ => _.entry_name == oldName);
                if(ix === -1) return;
                this.entries.splice(ix, 1);
                this.loading = false;
                this.handleAlert({type:'success', text:'Przeniesiono folder'})
            } catch(e) {}
            this.loading = false;
        },
        // whiteRightClick(e){
        //     console.log(e)
        //     this.handleOpenEntryContextMenuClick({event: e, whitespace: true})
        // },
        handleOpenEntryContextMenuClick (data) {
            // if(data.whitespace === true){
            //     this.entryContextMenuOptions = WhiteContextMenuOptions;
            //     data.item = Math.random()*1000
            //     return
            // }
            if(data.entry.entry_type == "dir"){
                this.entryContextMenuOptions = DirContextMenuOptions;
            }else if(data.entry.entry_type == "file"){
                this.entryContextMenuOptions = FileContextMenuOptions;
            }
            
            
            this.$refs.entryContextMenu.showMenu(data.event, data.item)
        },
        async handleModalConfirm(){
            if(this.additional_modal.slug == "rename"){
                await this.renameEntry(this.$refs.modal_input.value);
            }else if(this.additional_modal.slug == "delete"){
                if(this.open_entry.entry_type == "file")
                    await this.deleteFileEntry()
                else if (this.open_entry.entry_type = "dir"){
                    await this.deleteDirEntry()
                }
            }else if(this.additional_modal.slug == "mkdir"){
                await this.createDir();
            }else if(this.additional_modal.slug == "file_upload"){
                await this.uploadFiles()
            }else if(this.additional_modal.slug == "move"){
                if(this.additional_modal.move_target_dir == ""){
                    this.handleAlert({type:'info', text:'Nie wybrano folderu'})
                    return
                }else
                    await this.Move()
            }
            this.additional_modal.show = false; 
            this.additional_modal.move = false;
            this.additional_modal.dropzone = false;
            this.additional_modal.input = false;
            this.additional_modal.show = false;
        },
        handleModalClose(){
            this.additional_modal.show = false;
            this.additional_modal.move = false;
            this.additional_modal.dropzone = false;
            this.additional_modal.input = false;
            this.files = []},
        async optionClicked (event) {
            this.additional_modal.input = false;
            this.additional_modal.dropzone = false;
            this.additional_modal.move = false;
            this.additional_modal.move_target_dir = ""
            this.additional_modal.invertedColors = false;
            switch (event.option.slug) {
                case "rename":
                    this.open_entry = event.item;
                    this.additional_modal.show = true;
                    this.additional_modal.title = "Zmień nazwę";
                    this.additional_modal.slug = "rename";
                    this.additional_modal.confirmTxt = "Zmień";
                    this.additional_modal.input = true;
                    this.additional_modal.input_value =  this.open_entry.entry_plainname;
                    break;
                case "delete":
                    this.open_entry = event.item;
                    this.additional_modal.show = true;
                    this.additional_modal.title = "Czy napewno chcesz usunąć "+((this.open_entry.entry_type == "file")? "plik":"folder") +"?";
                    this.additional_modal.slug = "delete";
                    this.additional_modal.confirmTxt = "Usuń";
                    this.additional_modal.invertedColors = true;
                    this.additional_modal.input_value = "";
                    break;
                case "mkdir":
                    this.additional_modal.show = true;
                    this.additional_modal.title = "Jak chcesz nazwać folder?";
                    this.additional_modal.slug = "mkdir";
                    this.additional_modal.confirmTxt = "Stwórz";
                    this.additional_modal.input = true;
                    this.additional_modal.input_value = "Nowy Folder";
                    break;
                case "move":
                    this.open_entry = event.item;
                    this.additional_modal.show = true;
                    this.additional_modal.title = "Do którego folderu chcesz przenieść?";
                    this.additional_modal.slug = "move";
                    this.additional_modal.confirmTxt = "Przenieś";
                    this.additional_modal.move = true;
                    break;
                case "open_in_new_tab":
                    // console.log(this.$store.url+event.item.entry_path)
                    window.open(this.$store.state.frontUrl+event.item.entry_path, "_blank");
                    break;
                case "download":
                    this.forceFileDownload(event.item)
                    break;
                case "copy_path":
                    this.copyToClipboard(event.item.entry_path)
                    break;
                case "copy_url":
                    this.copyToClipboard(this.$store.state.frontUrl + event.item.entry_path)
                    break;
            }
            
        },
        copyToClipboard(url){
                let dummy = document.createElement('input')

                document.body.appendChild(dummy);
                dummy.value = url;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                this.handleAlert({type:'success', text:'Skopiowano!'})
        },
        async forceFileDownload(entry){
            const fileLink = document.createElement('a');
            fileLink.href = this.$store.state.frontUrl + entry.entry_path;
            fileLink.setAttribute('target', '_blank');
            fileLink.setAttribute('download', entry.entry_name);
            document.body.appendChild(fileLink);
            fileLink.click();
        },
        async uploadFiles(){
            if(this.loading == true) return;
            this.loading = true;
            this.progressbar.show = true;
 
            if(this.isNode){
                let ar = [];
                for(let i = 0; i < this.files.length; i++) {
                    let fd = new FormData();
                    fd.append("path", this.path+"/");
                    fd.append("file", this.files[i]);
                    ar.push(
                        this.$axios.$post('/filemanager/'+this.prefix+'/upload/', fd, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })) ;
                }

                try {
                    let r = await Promise.all(ar)
                    for (let i = 0; i < r.length; i++) {
                        
                         for (let j = 0; j < r[i].entries.length; j++) {
                            this.entries.unshift(r[i].entries[j])
                        }
                    }
                    this.handleAlert({type:'success', text:'Przesłano pliki'})
                } catch(e) { console.error(e)}
            } else {
                let formData = new FormData();
                for (let i = 0; i < this.files.length; i++) formData.append("file[]", this.files[i]);
                formData.append("path", this.path+"/");                    

                try {
                    let r = await this.$axios.$post('/filemanager/'+this.prefix+'/upload/', formData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }, 
                        onUploadProgress: (pE) =>{
                            this.progressbar.value = (pE.loaded/pE.total);
                        }
                    });

                    this.entries = this.entries.concat(r.entries)
                    this.handleAlert({type:'success', text:'Przesłano pliki'})
                } catch(e) {
                    console.error(e);
                }
            }

            this.progressbar.value = 0;
            this.files = []
            this.progressbar.show = false;
            this.loading = false;
        },
        openFileUploadModal(){
            this.additional_modal.show = true;
            this.additional_modal.title = "Wybierz pliki do przesłania";
            this.additional_modal.confirmTxt = "Zatwierdź";
            this.additional_modal.slug = "file_upload";
            this.additional_modal.invertedColors = false;
            this.additional_modal.input = false;
            this.additional_modal.dropzone = true;
        },
        goToDir(index){
            if(index == this.path_history.length-1) return;
            if(index >= 0){
                //console.log(index)
                let i = this.path_history.length-1
                let temp = this.path_history[index];
                while(i >= index){
                    this.path_history.pop()
                    i--;
                }
                this.openDir(temp)
            }

        },
        oneDirBack(){
        //     console.log(this.path)
        //     console.log(this.path_history)
            if(!this.isRoot()){
                this.path_history.pop()
                this.clearVariables()
                this.setPathFromHistory()
                this.fetchData();
            }
            // console.log(this.path)
            // console.log(this.path_history)
        },
        emitClose(){
            this.$emit('close', true)
        },
        async fetchData() 
        {
            if(!this.areEntries || this.is_loading) return;
            this.is_loading = true;
            try {
                let r = await this.$axios.$get(
                    `/filemanager/`+this.prefix+`/list/?page=`+ this.page+'&path='+this.path+"/"
                );

                for(let i = 0; i < r.entries.length; i++) r.entries[i].name_edit_mode = false;
                
                if(this.mimeTypeFilter[0] == "*"){
                    this.entries = this.entries.concat(r.entries)
                }else{
                    for (let i = 0; i < r.entries.length; i++) {
                        const entry = r.entries[i];
                        
                        if(entry.entry_type == "dir"){
                            this.entries.push(entry)
                            continue;
                        }
                        if(this.mimeTypeFilter.includes(entry.entry_mimetype.split("/")[0])) {
                            this.entries.push(entry)
                        }
                        
                    }
                    
                }
                

                this.areEntries = r.pagination.is_more;
                if(r.pagination.is_more) this.page += 1;
                        
                if(this.queue.length > 0) this[this.queue[0]]();
            } catch(e) {}

            this.is_loading = false;
        },
        handleFileDrop(e) {
            let droppedFiles = e.dataTransfer.files;
            if(!droppedFiles) return;
            ([...droppedFiles]).forEach(f => {
                this.pushFileToFiles(f)
            });
        },
        handleFileInput(e) {
            let files = e.target.files
            if(!files) return;
            ([...files]).forEach(f => {  
                this.pushFileToFiles(f)
            });
        },
        async pushFileToFiles(f){
            if(this.files.length >= 9){
                this.handleAlert({type:'danger', text:'Maksymalnie można przesłać 10 plików'})
                return
            }
            if(f.size > this.maxFileSize){

                this.handleAlert({type:'danger', text:'Jeden z plików jest za duży. Maksymalny rozmiar: '+this.maxFileSize/1024/1024+" Mb"})
                return
            }
            
            if(!file_name_reg.test(f.name)){
                this.handleAlert({type:'danger', text:'Niewłaściwa nazwa pliku'})
                return
            }
            if(f.type == ""){
                    this.files.push(f);
                    return 
            }

            let r = null;
            try {
                r = await this.$axios.$get(
                    '/filemanager/'+this.prefix+'/mimetype-whitelist/'
                );

                let error = true;
                const x = f.name.split(".")
                const file_extension = x[x.length-1]
                
                for (let i = 0; i < r.whitelist.whitelist.length; i++) {
                    const element = r.whitelist.whitelist[i];

                    let first_mimetype_chunk_whitelist = element.type.split("/")[0];
                    let second_mimetype_chunk_whitelist = element.type.split("/")[1];

                    let first_mimetype_chunk_file = f.type.split("/")[0];
                    let second_mimetype_chunk_file = f.type.split("/")[1];

                    let correct = [];

                    if(first_mimetype_chunk_whitelist == first_mimetype_chunk_file) {
                        correct.push(true);
                    } else if(first_mimetype_chunk_whitelist == '*') {
                        correct.push(true);
                    } else {
                        correct.push(false);
                    }

                    if(second_mimetype_chunk_whitelist == second_mimetype_chunk_file) {
                        correct.push(true);
                    } else if(second_mimetype_chunk_whitelist == '*') {
                        correct.push(true);
                    } else {
                        correct.push(false);
                    }

                    if(element.ext.toLowerCase() == file_extension.toLowerCase()) {
                        correct.push(true);
                    } else {
                        correct.push(false);
                    }

                    if(correct.indexOf(false) == -1) {
                        error = false;
                        break;
                    }
                }

                if(error == false) {
                    this.files.push(f);
                } else this.handleAlert({type:'danger', text:'Przesłano plik o niezgodnym typie'});
            } catch(e) {
                console.error(e);
            }            
        },
        removeFile(fileKey){
            this.files.splice(fileKey, 1)
        },
        handleAlert(data){
            this.alert.show = true;
            this.alert.type = data.type;
            this.alert.text = data.text;
            setTimeout(()=>{
                this.alert.show = false;
            }, 5000)
        }
    },
    components:{
        extIntersect: Intersect,
        wkEntry: wkEntry,
        wkFminputs: wkFmInputs,
        wkInfobar: wkInfobar
    }     
}
</script>
<style lang="scss">


</style>