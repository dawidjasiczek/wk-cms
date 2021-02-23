<template>
    <div class="wkfm-ibar" v-if="show">
        <div class="wkfm-ibar__grid">
            <div class="wkfm-ibar__content">
                <slot></slot>
            </div>
            <div class="wkfm-ibar__controls">
                <button v-if="showConfirm" class="btn btn--flex btn--success wkfm-ibar__controlbtn justify--center" @click="confirm()"><fa-icon :icon="confirmBtnIcon" /> {{confirmBtnText}}</button>
                <button v-if="showClose" class="btn  btn--danger wkfm-ibar__controlbtn btn--flex justify--center" @click="cancel()"><fa-icon :icon="cancelBtnIcon" /> {{cancelBtnText}}</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
import wkEntry from './FileManager-Entry'
export default {
    data() {
        return{
            
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title:{
            type: String,
            default: ""
        },
        showConfirm:{
            type: Boolean,
            default: false
        },
        showClose:{
            type: Boolean,
            default: false
        },
        cancelBtnIcon: {
            default: 'times',
            type: String
        },
        cancelBtnText: {
            type: String,
            default: 'Anuluj'
        },
        confirmBtnIcon: {
            default: 'check',
            type: String
        },
        confirmBtnText: {
            type: String,
            default: 'Zatwierdź'
        }
    },
    computed:{
        
    },
    mounted() {
        
    },
    methods: {
        confirm(){
            this.$emit('confirm');
        },
        cancel(){
                this.$emit('cancel');
        }
    },
    components:{
    }     
}
</script>
