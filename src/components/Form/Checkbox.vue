<template>
    <div class="wk-checkbox" :class="{
            'wk-checkbox--disabled': disabled
        }">
        <div class="wk-checkbox__cbox" @click="handleInput" >
            <input type="checkbox" :name="name" :id="el_id" :checked="v">
            <div 
                class="wk-checkbox__outer" 
                :class="{
                    'wk-checkbox__outer--active': v,
                    
                }"
            >
                <div 
                    class="wk-checkbox__inner" 
                    :class="{
                        'wk-checkbox__inner--active': v
                    }"
                >
                    <div class="wk-checkbox__rcont">
                        <span class="wk-checkbox__r1"
                            :class="{
                                'wk-checkbox__r1--active': v
                            }"
                        ></span>
                        <span class="wk-checkbox__r2"
                            :class="{
                                'wk-checkbox__r2--active': v
                            }"
                        ></span>
                    </div>
                </div>
            </div>
        </div>
        <label 
            :for="el_id" 
            class="wk-checkbox__label" 
            :class="{
                'wk-checkbox__label--disabled': !v && disableLabelOnOffState
            }"
        >
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    data(){
        return {

            v: false,

            el_id: null 
        }
    },

    
    watch: {
        value(v){
            this.handleV(v);
        },
        id(){
            this.handleId();
        }
    },

    methods: {
        handleInput(){
            if(this.disabled) return;
            this.v = !this.v;
            
            if(this.v === true){
                this.$emit('input', this.onValue);
            }
            else{
                this.$emit('input', this.offValue);
            }
        },

        handleV(v){
            if(v == this.onValue){
                this.v = true;
            }
            else{
                this.v = false;
            }
        },

        handleId(){
            if(this.id && this.id != ''){
                this.el_id = this.id
            }
            else{
                this.el_id = (Date.now() + Math.floor(Math.random() * 100000)).toString(16);
            }
        }
    },
    
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        onValue: {
            type: [String, Number, Boolean],
            default: true
        },
        offValue: {
            type: [String, Number, Boolean],
            default: false
        },
        id: {
            type: String
        },
        name: {
            type: String,
            default: ''
        },
        disableLabelOnOffState: {
            type: Boolean,
            default: false
        }
    },

    mounted(){
        this.handleV(this.value);
        this.handleId();
    }
}
</script>