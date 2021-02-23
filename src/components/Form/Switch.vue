<template>
    <div class="wk-switch" 
        :class="{
            'wk-switch--centered': centered,
            'wk-switch--darken': darken,
            'wk-switch--disabled': disabled
        }"
    >
        <div class="wk-switch__switch" @click="handleInput">
            <div class="wk-switch__inner" :class="{'primary': (type == 'primary'), 'secondary': (type == 'secondary'), 'active': v}">
                <button class="wk-switch__thumb" :class="{'active': v}"></button>
            </div>
        </div>
        <label class="wk-switch__label">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    data(){
        return {

            v: false
        }
    },

    
    watch: {
        value(v){
            this.handleV(v);
        }
    },

    methods: {
        handleInput(ev){
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
            else if(v != this.offValue){
                this.$emit('input', this.offValue);
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
        type: {
            type: String,
            default: 'primary'
        },
        onValue: {
            type: [String, Number, Boolean],
            default: true
        },
        offValue: {
            type: [String, Number, Boolean],
            default: false
        },
        centered: {
            type: Boolean,
            default: false
        },
        darken: {
            type: Boolean,
            default: false
        }
    },

    mounted(){
        this.handleV(this.value);
    }
}
</script>