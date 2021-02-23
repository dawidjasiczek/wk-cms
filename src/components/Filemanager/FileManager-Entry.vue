<template>
    <div class="wkfm-entry" @click="oneClick($event)"  :class="{list_mode: list_mode}" @contextmenu.prevent.stop="emitRightClick($event, entry)">
        <div class="wkfm-entry-preview" :class="{list_mode: list_mode}">
            
            <div class="wkfm-entry-preview__contener" v-if="!imageLoaded">
                <div class="wkfm-entry-preview__contener2">
                    <fa-icon class="wkfm-entry-preview__icon" :icon="entryIcon" ></fa-icon>
                </div>

            </div>
            <div class="wkfm-entry-preview__contener" v-else>
                <div class="wkfm-entry-preview__img" :style="{'background-image': `url('`+img.src+`')`}" ></div>
                
            </div>
            
            
            </div>
        <div :class="{list_mode: list_mode}" class="wkfm-entry-filename" :title="entry.entry_name">
            <div class="wkfm-entry-filename__name" :class="{list_mode: list_mode}">
                <template v-if="entry.entry_type != 'dir'">{{entry.entry_plainname}}</template>
                <template v-else>{{entry.entry_name}}</template>
            </div>
            <div class="wkfm-entry-filename__infos" v-if="list_mode">
                <span>Data modyfikacji: {{translatedDate}}</span>
                <span v-if="entry.entry_type == 'file'">Wielkość: {{translatedSize}}</span>
            </div>
            <!-- <input type="text" class="wkfm-entry--name-input" v-if="nameEditMode" ref="name" :value="entry.entry_name" v-on:keyup.enter="rename" >
            <div class="wkfm-entry--name-text" v-else v-on:dblclick="nameEditMode = true">{{entry.entry_name}}</div> -->
            
        </div>
        
    </div>
</template>

<script>
import {exts, icons} from './const'

export default {
    data() {
        return{
            imageLoaded: false,
            img: null,
            nameEditMode: false,
            clicks: 0,
            timer: null,
            menuOpt: []
        }
    },
    props: {
        list_mode: {
            type: Boolean,
            default: true
        },
        entry: {}
    },
    mounted() {
        
    },
    computed:{
        translatedDate(){
           // return new Date(x)
           if(this. entry != null)
           return new Date(this.entry.entry_mod_date*1000).toLocaleDateString()
        },
        translatedSize(){
           // return new Date(x)
           if(this.entry != null && this.entry.entry_type == "file"){
                const kb = 1024;
                const mb = kb*1204;
                const gb = mb*1204;
               if(this.entry.entry_size < kb){
                   return this.entry.entry_size.toFixed(2)+"B"
               }
               else if(this.entry.entry_size >= kb && this.entry.entry_size < mb){
                    return (this.entry.entry_size/1024).toFixed(2)+"KB"
               }else if(this.entry.entry_size >= mb && this.entry.entry_size < gb){
                    return (this.entry.entry_size/1024/1024).toFixed(2)+"MB"
               }else{
                    return (this.entry.entry_size/1024/1024/1024).toFixed(2)+"GB"
               }
                
           }
           
        },
        entryIcon(){
            
            if(this.entry.entry_type == "dir"){
                return "folder"
            }else{
                
                if(this.entry.entry_mimetype.startsWith("image/")){
                    this.img = new Image()
                    this.img.onload = ()=>{
                        
                        this.imageLoaded = true;
                        // console.log(encodeURI(this.$store.state.url+this.entry.entry_path))
                    }
                    this.img.src = encodeURI(this.$store.state.frontUrl+this.entry.entry_path);
                    
                }
                let icon = "file"
                if(exts[this.entry.entry_extension] != undefined){
                    if(icons[exts[this.entry.entry_extension]] != undefined){
                        icon = icons[exts[this.entry.entry_extension]]
                    }
                }
                
                return icon
            }
            
        }
    },
    methods: {
        oneClick: function(event){
          this.clicks++ 
          if(this.clicks === 1) {
            var self = this
            this.timer = setTimeout(()=> {
                this.emitOpenInfo();
                self.clicks = 0
            }, 200);
          } else{
             clearTimeout(this.timer);  
             this.emitOpenDir()
             this.clicks = 0;
          }         
        },
        emitOpenDir(){
            if(this.entry.entry_type == "dir"){
                this.$emit('open_dir', this.entry.entry_name)
            }
            
        },
        emitRightClick (event, item) {
            this.$emit('right_click',{event: event, item: item, entry: this.entry})
        },
        emitOpenInfo(){
            
                this.$emit('open_info', this.entry.entry_path)
            
            
        },
        rename(){
            this.nameEditMode = false
        }
    },
    components:{
        
        
    }     
}
</script>

<style lang="scss">
</style>