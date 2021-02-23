<template>
    <div class="wk-fileinput" :class="{
                'wk-fileinput--disabled': disabled,
                'wk-fileinput--correct': correct,
                'wk-fileinput--incorrect': incorrect,
        }" @dragover.prevent @drop.prevent>
        <p class="wk-fileinput__label" v-if="label.length>0" >{{label}}</p>
        <transition name="fade">
            <p class="wk-fileinput__msg" v-if="incorrect === true">{{msg}}</p>
        </transition>
        <div class="wk-fileinput__dropzone" :class="{'small': small,'wk-fileinput__dropzone--disabled': disabled,
                'wk-fileinput__dropzone--correct': correct,
                'wk-fileinput__dropzone--incorrect': incorrect}" @drop="handleFileDrop"  @click="$refs['file-input'].click()">
            <p class="wk-fileinput__dropzone-text" :class="{'small': small, 'wk-fileinput__dropzone-text--disabled': disabled,
                'wk-fileinput__dropzone-text--correct': correct,
                'wk-fileinput__dropzone-text--incorrect': incorrect}">Kliknij lub przeciągnij by wybrać pliki do przesłania</p>
            <input type="file" ref="file-input" name="wk-fileinput__file-input"  :multiple="multi" @change="handleFileInput">
        </div>
            <div   class="wk-fileinput__filelist" :class="{'small': (small || !multi)? true:false}" >
                <h5 v-if="!progressbar_show && showFileList">Wybrane pliki ({{files.length}}): </h5>
                <ul v-if="!progressbar_show && showFileList">
                    <li v-for="(file, index)  in files" :key="index"><button @click="removeFile(index)"
                                                title="Usuń" class="wk-fileinput__filelist__deletebtn btn btn--danger btn--sm"><fa-icon icon="times" /></button>
                                            {{ file.name }} ({{ file.size }} b)
                                            
                    </li>
                </ul>
                <div class="wk-fileinput-progressbar" v-if="progressbar_show">
                    <div class="wk-fileinput-progressbar__contener">
                        <div class="wk-fileinput-progressbar__bar" :style="{'width': (progressbar_value*100)+'%'}" ref="modal_progressbar"></div>
                    </div>
                    <div class="wk-fileinput-progressbar__percent" >
                        {{Math.ceil(progressbar_value.toFixed(2)*100)}}%
                    </div>
                </div>
            </div>
    </div>
        
</template>

<script>
export default {
    data(){
        return {
            files: [],
            incorrect: false,
            correct: false
        }
    },
    computed: {
       progressbar_show(){
           if(this.progressbar_value != 0){
               return true
           }else{
               return false
           }
       }
    },
    methods: {
        clear(){
            this.files = []  
        },
        handleFileDrop(e) {
            let droppedFiles = e.dataTransfer.files;
            if(!droppedFiles) return;
            ([...droppedFiles]).forEach(f => {
                this.pushFileToFiles(f)
            });
            if(files.length > 0){
                this.$emit('input', this.files);
                this.clear()
            }
        },
        async validate(){
            if(!this.required){
                this.incorrect = false;
                this.correct = false;
                return true;
            }
            if(this.required && this.files.length < this.minFiles){
                this.incorrect = true;
                this.correct = false;
                return false;
            }

            this.incorrect = false;
            this.correct = true;

            
            return true;
        },
        handleFileInput(e) {
            let files = e.target.files
            if(!files) return;
                ([...files]).forEach(f => {  
                    this.pushFileToFiles(f)
            });
            if(files.length > 0){
                this.$emit('input', this.files);
                this.clear()
            }
        },
        async pushFileToFiles(f){
            if(this.files.length >= this.filesLimit || (!this.multi && this.files.length >= 1)){
                this.$alert({type:'error', msg:'Maksymalnie można przesłać '+this.maxFileSize+' plików'})
                return
            }
            if(f.size > this.maxFileSize){
                this.$alert({type:'error', msg:'Jeden z plików jest za duży. Maksymalny rozmiar: '+this.maxFileSize/1024/1024+" Mb"})
                return
            }
            let re = /^[A-Za-z0-9ĄĆĘŁŃÓŚŻŹąćęłńóśżźÁČĎÉĚÍŇŘŠŤÚŮÝŽáčďéěíňřšťúůýž_\-\!\@\#\%\^\&\*\(\)\+\=\|\;\:\,\.\?\`\~\— ]*$/;
            if(this.file_name_reg.length  != "" && this.file_name_reg.length > 0){
                re  = new RegExp(this.file_name_reg)
            }
            if(!re.test(f.name)){
                this.$alert({type:'error', msg:'Niewłaściwa nazwa pliku'})
                return
            }
            if(f.type == ""){
                    this.files.push(f);
                    return 
            }
            this.files.push(f);
            this.validate()
            // let r = await this.$root.GET(
            //     '/filemanager/'+this.prefix+'/mimetype-whitelist'
            // );

            // if (r && r.success == true) {
            //     let error = true;
            //     const x = f.name.split(".")
            //     const tfext = x[x.length-1]
                
            //     for (let i = 0; i < r.whitelist.whitelist.length; i++) {
            //         const element = r.whitelist.whitelist[i];
                    
            //         if(element.type == f.type && element.ext == tfext){
            //             error = false;
            //         }
            //     }
            //     if(!error){
            //         this.files.push(f);
            //     }else{
            //         this.handleAlert({type:'error', text:'Przesłano plik o niezgodnym typie'})
            //     }
                
            // } else {
            //     this.handleAlert({type:'error', text:'Wystąpił błąd podczas sprawdzania pików. Error Code: '+r.error_code})
            // }
            
        },
        clear(){
            this.files = []
        },
        removeFile(fileKey){
            
            this.files.splice(fileKey, 1)
            this.validate()
        }
    },
    
    props: {
        file_name_reg:{ 
            type: String,
            default: ""
        },
        showFileList:{
            type: [String, Boolean],
            default: true
        },
        multi:{
            type: [String, Boolean],
            default: false
        },
        filesLimit:{
            type: Number,
            default: 1
        },
        small:{
            type: [String, Boolean],
            default: false
        },
        label:{
            type: String,
            default: ""
        },
        msg:{
            type: String,
            default: ''
        },
        disabled:{
            type: Boolean,
            default: false
        },
        progressbar_value: {
            type: Number,
            default: 0
        },
        minFiles:{
            type: Number,
            default: 1
        },
        required: {
            type: Boolean,
            default: false
        }
    }
}
</script>