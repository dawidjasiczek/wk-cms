<template>
    <div class="wk-input" @click="triggerFocus">
        <div class="wk-input__inner"
            :class="{
                'wk-input__inner--focus': focus,
                'wk-input__inner--disabled': disabled,
                'wk-input__inner--incorrect': incorrect, 
                'wk-input__inner--correct': correct,
                'wk-input__inner--size-small': size == 'small'
            }"
        >
            <label :for="el_id" class="wk-input__label"
                :class="{
                    'wk-input__label--small': focus || v !== '' || (type != 'text' && type != 'textarea' && type != 'password' && type != 'number'),
                    'wk-input__label--disabled': disabled,
                    'wk-input__label--incorrect': incorrect, 
                    'wk-input__label--correct': correct,
                    'wk-input__label--size-small': size == 'small'
                }"
            >
                {{ label }}
            </label> 
            <div 
                class="wk-input__input"
                :class="{
                    'wk-input__input--size-small': size == 'small'
                }"
            >
                <input 
                    :name="name" 
                    :id="el_id" 
                    :type="type" 
                    v-if="type != 'textarea'" 
                    :value="value"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    :disabled="disabled"
                    :placeholder="placeholder"
                    ref="input"
                >
                
                <textarea 
                    :name="name" 
                    :id="el_id" 
                    v-else 
                    :value="value" 
                    :disabled="disabled"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    :placeholder="placeholder"
                    ref="input"
                    :style="{
                        'min-height': textareaHeight + 'px'
                    }"
                ></textarea>
            </div>
        </div>
        <transition name="fade">
            <div class="wk-input__msg" v-if="incorrect === true && msg != ''">
                {{ msg }}
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "WkInput",
    data(){
        return {
            correct: false,
            incorrect: false,
            focus: false,
            v: '',
            el_id: null
        }
    },
    watch: {
        value(){
            if(this.value != this.v){
                this.v = this.value;
            }
        },
        id(){
            this.handleId();
        }
    },
    methods: {
        handleInput(ev){
            this.v = ev.srcElement.value;
            this.validate();
            this.$emit('input', this.v);
        },
        handleFocus(){
            this.focus = true;
            this.validate();
        },
        handleBlur(){
            this.focus = false;
        },
        triggerFocus(){
            if(!this.disabled) this.$refs['input'].focus();
        },
        validate(){
            //if no rules return
            if(!this.required && !this.regex && !this.customValidator && ((this.max <= 0 && this.type == 'number') || (this.maxLength <= 0 && this.type != 'number'))) {
                if(this.incorrect == true) this.incorrect = false;
                if(this.correct == true) this.correct = false;
                return true;
            }
            //presence
            if(this.required && this.v === ''){
                this.incorrect = true;
                this.correct = false;
                return false;
            }
            //regex
            if(this.regex && !this.regex.test(this.v)){
                this.incorrect = true;
                this.correct = false;
                return false;
            }
            //max - for numbers
            if(this.type == 'number' && this.max > 0 && parseFloat(this.v) > this.max){
                this.incorrect = true;
                this.correct = false;
                return false;
            }
            //maxLength - for strings
            if(this.type != 'number' && this.maxLength > 0 && this.v.length > this.maxLength){
                this.incorrect = true;
                this.correct = false;
                return false;
            }
            //custom func
            if(this.customValidator && this.customValidator(this.v) === false){
                this.incorrect = true;
                this.correct = false;
                return false;
            }
            this.incorrect = false;
            this.correct = true;
            return true;
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
    mounted(){
        if(this.value !== ''){
            this.v = this.value;
        }
        this.handleId();
    },
    
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        msg: {
            type: String,
            default: ''
        },
        required: {
            type: [Boolean, String],
            default: false
        },
        regex: {
            type: RegExp,
            default: null
        },
        customValidator: {
            type: Function,
            default: null
        },
        max: {
            type: Number,
            default: -1
        },
        maxLength: {
            type: Number,
            default: -1
        },
        type: {
            type: String,
            default: 'text'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        id: {
            type: String
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'normal'
        },
        textareaHeight: {
            type: Number,
            default: 130
        }
    }
}
</script>