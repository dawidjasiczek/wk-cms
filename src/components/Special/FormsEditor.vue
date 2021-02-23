<template>
    <div class="wk-forms-editor">
        <div class="wk-forms-editor__menu">
            <template v-if="!consenseMode">
                <div class="btn btn--sm btn--info" @click="addInput('text')"><fa-icon icon="align-center" /> Tekst</div>
                <div class="btn btn--sm btn--info ml-1-2" @click="addInput('checkbox')"><fa-icon icon="check-square" /> Checkbox</div>
                <div class="btn btn--sm btn--info ml-1-2" @click="addInput('switch')"><fa-icon icon="toggle-off" /> Switch</div>
                <div class="btn btn--sm btn--info ml-1-2" @click="addInput('select')"><fa-icon icon="list" /> Select</div>
             </template>
             <template v-else>
                 <div class="btn btn--sm btn--info" @click="addInput('consense')"><fa-icon icon="clipboard-check" /> Dodaj nową zgodę</div>
             </template>
        </div>
        <div class="wk-forms-editor__container">
            <div class="wk-forms-editor__content">
                <Container 
                :get-ghost-parent="getGhostParent"
                group-name="wk-forms-editor"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                @drop="(e) => onItemDrop(e)"
                >
                    <Draggable v-for="block in content" :key="block.c_id">
                        <div class="wk-forms-editor__block" >
                            <div v-if="block.type=='consense'"   >
                                <div style="display:flex;">
                                    <WkCheckbox  />{{block.lead}}<span  class="wk-forms-editor__block__expand" v-if="block.expandable">zwiń</span>
                                </div>
                                
                                <div v-if="block.expandable" v-html="block.details" class="wk-forms-editor__block__expanded form-wysiwyg__content"></div>
                            </div>
                            <WkInput v-if="block.type=='text'" :label="block.label" />
                            <WkCheckbox v-if="block.type=='checkbox'" :label="block.label"/>
                            <WkSwitch v-if="block.type=='switch'" :label="block.label"/>
                            <WkSelect v-if="block.type=='select'" :label="block.label"/>
                            <div class="wk-forms-editor__block-cover" @click="editModal(block.c_id)">
                                <fa-icon icon="edit" class="icon"></fa-icon>
                            </div>
                        </div>
                    </Draggable>
                </Container>
                
            </div>
        </div>
        <WkModal :show="edit_modal" @confirm="editBlock()"  confirmButtonType="success" confirmButtonText="Zapisz" @cancel="clearEdit">
            <h2>Edytuj</h2>
            <template v-if="edit_index != -1">
                <template v-if="!consenseMode">

                    <WkInput class="mb-1" v-model="edit_temp.label" label="Podpis pola" />
                    <WkSwitch class="mb-1" v-model="edit_temp.required" label="Czy pole jest wymagane?"></WkSwitch>
                    <WkAnimatedCollapse :show="edit_temp.required">
                        <WkInput class="mb-1" v-model="edit_temp.msg" label="Informacja o błednym wypełnieniu pola"/>
                    </WkAnimatedCollapse>
                    <template v-if="edit_type == 'select'">
                        <h4>Opcje</h4>
                        <ul class="list--none list--no-margin wk-forms-editor__select-options" >
                            <li class="wk-forms-editor__select-options-item" v-for="(opt, ix) in edit_temp.options" :key="'rand_'+opt+Math.random()">
                                <button class="btn btn--danger btn--xs " @click="edit_temp.options.splice(ix, 1)"><fa-icon icon="times"/></button>
                                <span class="ml-1-2">{{opt}}</span>
                            </li>
                        </ul>
                        <WkInput v-on:keyup.native.enter="edit_temp.options.push(edit_temp.new_opt); edit_temp.new_opt = ''" class="mb-1" v-model="edit_temp.new_opt" label="Nowa opcja" />
                        <button class="btn btn--info btn--sm" 
                        @click="edit_temp.options.push(edit_temp.new_opt); edit_temp.new_opt = ''">
                        Dodaj opcje</button>
                    </template>
                </template>
                <template v-else>
                    <WkInput class="mb-1" v-model="edit_temp.lead" label="Krótki tekst" />
                    <WkSwitch class="mb-1" v-model="edit_temp.expandable" label="Czy pole ma rozwinięcie?"></WkSwitch>
                    <WkAnimatedCollapse :show="edit_temp.expandable">
                        <WkWysiwyg  class="mb-1" v-model="edit_temp.details" label="Długi tekst" />
                    </WkAnimatedCollapse>
                    
                    <WkSwitch class="mb-1" v-model="edit_temp.required" label="Czy pole jest wymagane?"></WkSwitch>
                    <WkAnimatedCollapse :show="edit_temp.required">
                        <WkInput class="mb-1" v-model="edit_temp.msg" label="Informacja o błednym wypełnieniu pola"/>
                    </WkAnimatedCollapse>
                    
                </template>
                <button class="btn btn--danger btn--sm mt-2 mb-1" 
                        @click="deleteBlock()">
                        Usuń cały bloczek</button>
            </template>
            
        </WkModal>
    </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
export default {
    
    data(){
        return {
            content: [],
            edit_type: '',
            edit_index: -1,
            edit_modal: false,
            edit_temp: {
                new_opt: ""
            }
        }
    },
    components: { 
        Container, Draggable
    },
    methods:{
        deleteBlock(){
            if(this.edit_index != -1){
                this.content.splice(this.edit_index, 1);
                this.$emit('input', this.content)
                this.clearEdit()
            }
        },
        getGhostParent() {
            return document.body;
        },
        async onItemDrop(e){
            if (e.removedIndex !== null || e.addedIndex !== null) {
                
                const el = this.content.splice(e.removedIndex, 1);
                this.content.splice(e.addedIndex, 0, el[0]);
                this.$emit('input', this.content)
            }
        },
        addInput(type){
            if(type == "text" || type == "checkbox" || type=="switch"){
                this.content.push({
                    type: type,
                    label: 'Podpis pola',
                    required: false,
                    msg: 'To pole jest wymagane.',
                    c_id: type+"_"+(+new Date())+Math.random() * 100000
                })
            } else if(type == "select"){
                this.content.push({
                    type: 'select',
                    label: 'Podpis pola wyboru',
                    required: false,
                    msg: 'To pole jest wymagane.',
                    options: [],
                    c_id: type+"_"+(+new Date())+Math.random() * 100000
                })
            }else if(type == "consense" && this.consenseMode){
                this.content.push({
                    type: type,
                    lead: "Krótki tekst",
                    required: false,
                    msg: 'To pole jest wymagane.',
                    expandable: true,
                    details: 'Długi tekst, detale.',
                    c_id: type+"_"+(+new Date())+Math.random() * 100000
                })
            }
            this.$emit('input', this.content)
        },
        editBlock(){
            if(this.edit_index != -1){
                this.content[this.edit_index] = this.edit_temp;
                this.clearEdit()
                this.$emit('input', this.content)
            }
                
            
        },
        clearEdit(){
            this.edit_modal = false;
            this.edit_type = "";
            this.edit_index = -1
            this.edit_temp = {
                new_opt: ""
            }
        },
        editModal(id){
            const ix = this.content.findIndex((_)=> _.c_id == id);
            if(ix == -1){
                this.$alert({type: 'danger', msg: "Wystąpił błąd [F_EDITOR 501]"})
            }
            this.edit_modal = true;
            this.edit_type = this.content[ix].type;
            this.edit_index = ix;
            this.edit_temp = JSON.parse(JSON.stringify(this.content[ix]))
        }
    },
    props: {
        consenseMode: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: ()=>{
                return []
            }
        }
    },
    watch:{
        value(){
            this.content = this.value
        }
    },
    mounted() {
        this.content = this.value
    }
}
</script>