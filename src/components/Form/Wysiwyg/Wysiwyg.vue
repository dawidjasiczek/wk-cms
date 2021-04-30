<template>
    <div class="wk-wysiwyg"
    
    >
        <p class="wk-wysiwyg__label">{{label}}</p>
        <quill-editor
            :content="value"
            :options="editorOption"
            @change="onEditorChange($event)"
            ref="quill"
            class="custom-quill-styles"
        />
        <WkFileManager 
        v-if="allowImages" isNode :allowedMimetypes='allowedMimetypes'  @selected-file="sc" :show="showModal" @close="closeModal" :prefix="prefix" />
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import { quillEditor } from 'vue-quill-editor'

import { IndentStyle } from './WysiwygHelpers';
Quill.register('modules/imageResize', ImageResize);
//style inline
Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/style/background'), true);
Quill.register(Quill.import('attributors/style/color'), true);
Quill.register(Quill.import('attributors/style/direction'), true);
Quill.register(Quill.import('attributors/style/font'), true);
let sizes = Quill.import('attributors/style/size');
sizes.whitelist = [
    '10px', '20px', '30px'
];
Quill.register(sizes, true);
Quill.register(IndentStyle, true);

import ImageResize from 'quill-image-resize';
import Quill from 'quill';

Quill.register('modules/imageResize', ImageResize);

const icons = Quill.import('ui/icons');
icons['wk-file'] = `
<span style="display: block; padding: 1px 0; width: 100%; height: 100%;">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
  <g>
    <g>
      <path d="m452.5,11h-393c-11.3,0-20.4,9.1-20.4,20.4v449.2c0,11.3 9.1,20.4 20.4,20.4h279.1c15,2.4 31.1-18.5 31.1-18.5l94.6-94.6c0,0 8.7-6.7 8.6-17v-339.5c-1.13687e-13-11.3-9.1-20.4-20.4-20.4zm-89.3,420.3v-40h40l-40,40zm68.9-80.9h-89.3c-11.3,0-20.4,9.1-20.4,20.4v89.3h-242.5v-408.3h352.2v298.6z"/>
      <path d="m179.4,230.9h153.1c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-153.1c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.2,20.4 20.4,20.4z"/>
      <path d="m179.4,315.6h153.1c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-153.1c-11.3,0-20.4,9.1-20.4,20.4 0,11.2 9.2,20.4 20.4,20.4z"/>
    </g>
  </g>
</svg>
</span>
`;

export default {
    data(){
        return {
            showModal: false,
            filemgrMode: null,
            allowedMimetypes: [],
            editorOption: {
                placeholder: 'Wpisz treść',
                modules: {
                    toolbar: {
                        formats: [
                            'background',
                            'bold',
                            'color',
                            'italic',
                            'code',
                            'font',
                            'link',
                            'strike',
                            'underline',
                            'image',
                            'size',
                            'script',
                            'width',
                            'header',
                            'blockquote',
                            'code-block',
                            'list',
                            'indent',
                            'direction',
                            'align',
                            'size',
                            'width'
                        ],
                        container: [
                            [{ 'size': ['10px', false, '20px', '30px'] }],
                            [{'header': [1,2,3,4,5,6,false]}],  // custom dropdown
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'code-block'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                            [{ 'direction': 'rtl' }],                         // text direction

                            

                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['image', 'link', 'wk-file'],
                            ['clean']   
                        ],
                        handlers:{
                            'image': (val)=>{
                                this.filemgrMode = 'image';
                                this.allowedMimetypes = this.allowedImageMimetypes;
                                this.showModal = true;
                                

                            },
                            'wk-file': (val)=>{
                                this.filemgrMode = 'file';
                                 this.allowedMimetypes = this.allowedFileMimetypes;
                                this.showModal = true;
                                
                            }
                        }
                    },
                
                    imageResize: {
                        modules: ['Resize', 'DisplaySize']
                    }
                },
                
            }
        }
    },

    watch: {
      
    },  
    components:{
        quillEditor
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },

    methods: {
        validate(){
            return true;
        },
        sc(e){
            let index = this.$refs.quill.quill.getSelection(true);
            if(this.filemgrMode == "image"){
                this.$refs.quill.quill.insertEmbed(index.index,'image', this.$store.state.frontUrl + e.entry_path);
            }else if(this.filemgrMode == "file"){
                this.$refs.quill.quill.insertText(index.index, e.entry_name, {
                    link: this.$store.state.frontUrl + e.entry_path
                });
            }
            
            this.showModal = false;
        },
        closeModal(){
            this.showModal = false;
        },
        onEditorChange({ quill, html, text }) {
         //console.log('editor change!', quill, html, text)
         //console.log(html)
         this.$emit('input', html)
        }
    },

    mounted(){
        
    },
    
    props: {
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        allowImages:{
            type: Boolean,
            default: false
        },
        prefix: {
            type: String,
            default: "files"
        },
        allowedFileMimetypes: {
            type: Array,
            default: function () {
                return ['*']
            }
        },
        allowedImageMimetypes: {
            type: Array,
            default: function () {
                return ['image/*']
            }
        }
    }
}
</script>