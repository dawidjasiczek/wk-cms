<template>
    <transition name="fade">
        <div v-if="show" class="wk-button-spinner" 
        :class="{
            'wk-button-spinner--primary': color == 'primary' ,
            'wk-button-spinner--secondary': color == 'secondary' ,
            'wk-button-spinner--success': color == 'success' ,
            'wk-button-spinner--danger': color == 'danger' ,
            'wk-button-spinner--info': color == 'info' 
        }">

            <svg class="wk-button-spinner__spinner w-6 h-6 inline-block" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" :stroke="newColor" stroke-width="5"></circle>
            </svg>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: '#fff'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        newColor(){
            if((/^\#[0-9a-fA-F]{6}$/).test(this.color) || (/^\#[0-9a-fA-F]{3}$/).test(this.color) ){
                return this.color
            }else{
                return ""
            }
        }
    }
    
}
</script>