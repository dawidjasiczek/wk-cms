<template>
    <div class="wk-table-editor">
        <div class="wk-table-editor-row">
            <div class="wk-table-editor-row__container" >
                <div class="wk-table-editor-row__content wk-table-editor-row__content--head">
                    <div class="wk-table-editor-row__cells wk-table-editor-row__cells--head">
                        <div class="wk-table-editor-row__cell" :style="{
                            'width': cells_width
                        }" v-for="(head, row_index) in content[0]" :key="'head_cell_'+row_index">
                            <button class="btn btn--danger btn--xs remove-column"
                            @click="handleRemoveColumn(row_index)"
                             title="Usuń kolumne"><fa-icon icon="times" /></button>
                            <button class="btn btn--info btn--xs edit-cell"
                            @click="handleEdit('header', row_index)"
                            ><fa-icon icon="pen" /></button>
                            {{head}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wk-table-editor-row" v-for="(row, row_index) in not_first_content" :key="'row_'+row_index">
            <div class="wk-table-editor-row__container" >
                <div class="wk-table-editor-row__content">
                    <div class="wk-table-editor-row__cells">
                        <button class="btn btn--danger btn--xs remove-row" title="Usuń rząd" 
                        @click="handleRemoveRow(row_index)"><fa-icon icon="times" /></button>
                        <div class="wk-table-editor-row__cell" :style="{
                            'width': cells_width
                        }" v-for="(cell, column_index) in row" :key="'cell_'+row_index+'_'+column_index">
                            <div v-html="cell"></div>
                            <button class="btn btn--success btn--xs add-row" @click="addRow(row_index+1)"><fa-icon icon="plus" /></button>
                            
                            <button class="btn btn--info btn--xs edit-cell"
                            @click="handleEdit('content', row_index+1, column_index)"
                            ><fa-icon icon="pen" /></button>
                            <button class="btn btn--success btn--xs add-column" 
                            @click="addColumn(column_index+1)"><fa-icon icon="plus" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
        <WkModal :show="remove.show" @confirm="(remove.what == 'column')? removeColumn():removeRow()" @cancel="remove.show = false">
            <h2>Czy napewno chcesz usunąć {{(remove.what == "column")? "kolumne":"wiersz"}}?</h2>
        </WkModal>
        <WkModal :show="edit_modal" :cancelButtonText="false" @confirm="updateTable" confirmButtonType="success" confirmButtonText="Ok">
           
            <template v-if="edit_type=='content'">
                <WkWysiwyg v-model="content[edit_index_row][edit_index_column]"></WkWysiwyg>
            </template>
            <template v-else-if="edit_type=='header'">
                <WkInput label="Treść nagłówka tabeli" type="text" v-model="content[0][edit_index_row]"/>
            </template>
            <template v-else>
                Błąd.
            </template>
        </WkModal>
    </div>
</template>
<script>
export default {
	data(){
        return{
            content: [['Nagłówek 1', 'Nagłówek 2'], ["", ""]],
            edit_modal: false,
            edit_type: "header",
            edit_index_column: -1,
            edit_index_row: -1,
            remove:{
                show: false,
                what: "",
                toRemove: -1
            }
        }
    },
    methods: {
        handleEdit(what, row, column){
            if(what == "header"){
                this.edit_type = "header";
                this.edit_modal = true;
                this.edit_index_row = row;
            }else if(what == "content"){
                this.edit_type = "content";
                this.edit_modal = true;
                this.edit_index_row = row;
                this.edit_index_column = column;
            }else{
                this.clearEdit()
            }
        },
        clearEdit(){
            this.edit_modal = false;
            this.edit_index_column = -1;
            this.edit_index_row = -1;
            this.edit_type = "header"
        },
        addColumn(ix){
            this.$alert({type: "info", msg: "Prosze pamiętać, że na urządzeniach mobilnych tabelka będzie się 'łamała'"})
            for (let i = 0; i < this.content.length; i++) {
                this.content[i].splice(ix, 0, "");
            }
        },
        addRow(ix){
            this.content.splice(ix, 0, []);
            for (let i = 0; i < this.content[ix+1].length; i++) {
                this.content[ix].push(" ")
            }
        },
        clearRemove(){
            this.remove.what = "";
            this.remove.toRemove = -1;
            this.remove.show = false ;
        },
        handleRemoveColumn(ix){
            this.remove.show = true;
            this.remove.what = "column";
            this.remove.toRemove = ix;
        },
        handleRemoveRow(ix){
            this.remove.show = true;
            this.remove.what = "row";
            this.remove.toRemove = ix +1;
        },
        removeColumn(){
            if(this.remove.toRemove == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [TABLE_EDITOR 110]"})
                this.clearRemove();
                return;
            }
            if(this.content[0].length <= 1){
                this.$alert({type: "danger", msg: "Nie można usunąć ostatniej kolumny"})
                this.clearRemove();
                return;
            }
            for(let i = 0; i < this.content.length; i++){
                this.content[i].splice(this.remove.toRemove, 1)
            }
            this.clearRemove();
            this.$alert({type: "success", msg: "Usunięto kolumne"})
        },
        removeRow(){
            if(this.remove.toRemove == -1){
                this.$alert({type: "danger", msg: "Wystąpił błąd [TABLE_EDITOR 111]"})
                this.clearRemove();
                return;
            }
            if(this.content.length <= 2){
                this.$alert({type: "danger", msg: "Nie można usunąć ostatniego wiersza"})
                this.clearRemove();
                return;
            }
            if(this.remove.toRemove == 0){
                this.$alert({type: "danger", msg: "Nie można usunąć nagłówka"})
                this.clearRemove();
                return;
            }
            this.content.splice(this.remove.toRemove, 1)
            this.clearRemove();
            this.$alert({type: "success", msg: "Usunięto wiersz"})
        },
        updateTable(){
            this.clearEdit()
            this.$emit("data-update", this.content)
        }
    },
    computed:{
        not_first_content(){
            return this.content.slice(1)
        },
        cells_width(){
            return (100/this.content[0].length)+'%';
        }
    },
    watch:{
        value(){
            
            this.content = this.value;
        },
        content(){
            //console.log(this.content)
        }
    },
    props:{
        value: {
            type: Array,
            default: ()=>{
                return [['Nagłówek 1', 'Nagłówek 2'], ["", ""]]
            }
        }
    },
    mounted(){
        
        this.content = this.value;
        
    }
}
</script>