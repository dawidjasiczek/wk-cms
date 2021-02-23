<template>
    <div >
        <transition name="fade">
            <p class="wk-radio__msg" v-if="incorrect === true">{{msg}}</p>
        </transition>
        <WkRadio 
        v-for="(item, index) in data"
        :key="item[dataValue]" 
        :ref="'radio-' + index" 
        :label="getLabel(item)"
        :data="item[dataValue]"
        :name="name"
        :disabled="disabled"
        @changed="handleChange"
        :selected="(value==item[dataValue])?true:false"
        ></WkRadio>
    </div>
</template>

<script>
export default {
    data(){
        return {
            v: '',
            incorrect: false,
            correct: false
        }
    },
    watch: {
        value(){
            if(this.value != this.v){
                this.setV(this.value);
                this.validate();
            }
        }
    },
    methods: {
        handleChange(e){
            if(!this.disabled){
                this.$emit('change', e);
            }
        },
        getLabel(obj){
            if(this.dataLabel.indexOf('.') === -1) return obj[this.dataLabel];
            const a = this.dataLabel.split('.');
            let r = JSON.parse(JSON.stringify(obj));
            for(let i = 0; i < a.length; i++){
                if(r[a[i]] !== undefined){
                    r = r[a[i]];
                }
            }
            return r;
        },
        async validate(){
            if(!this.required){
                this.incorrect = false;
                this.correct = false;
                return true;
            }
            if(this.required && this.v == ''){
                
                this.incorrect = true;
                this.correct = false;
                return false;
            }

            this.incorrect = false;
            this.correct = true;

            
            return true;
        },
    
        setV(v){
                this.v = v;
                this.$emit('change', v);
        },
    },
    mounted(){
        
        if(this.value != ''){
            this.setV(this.value);
            this.validate();
        }
    },
    props: {
        data: {
            type: Array,
            default(){
                return []
            }
        },
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        dataValue: {
            type: String,
            default: 'value'
        },
        dataLabel: {
            type: String,
            default: 'label'
        },
        name: {
            type: String,
            default: ''
        },
        msg:{
            type: String,
            default: ''
        },
        disabled:{
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    }
}
</script>