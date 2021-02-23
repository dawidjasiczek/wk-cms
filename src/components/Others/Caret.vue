<template>
    <div class="wk-caret" :class="{
        'wk-caret--rotated': rotate
    }">
    <div class="wk-caret__caret"
     :class="{
                'wk-caret__caret--big': (size=='big')? true:false,
                'wk-caret__caret--small': (size=='small')? true:false
    }">
            <fa-icon 
            :icon="icon" 
            class="wk-caret__caret-icon"
            :class="{
                'wk-caret__caret-icon--big': (size=='big')? true:false,
                'wk-caret__caret-icon--small': (size=='small')? true:false,
                
            }"
            ></fa-icon>
        </div>
    </div>
</template>

<script>


export default {

    data(){
        return{

        }
    },

    methods: {

    },

    mounted(){
        
    },

    destroyed() {

    },

    props: {
        rotate: {
            type: Boolean,
            default: false
        },
        icon:{
            type: String,
            default: "angle-down"
        },
        size:{
            type: String,
            default: "normal"
        }
    }
}
</script>