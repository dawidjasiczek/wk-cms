<template>
    <div class="wk-select">
        <div class="wk-select__inner"
            :class="{
                'wk-select__inner--focus': focus,
                'wk-select__inner--disabled': disabled,
                'wk-select__inner--incorrect': incorrect, 
                'wk-select__inner--correct': correct
            }"
            @click="toggle"
            ref="select"
        >
            <label class="wk-select__label"
                :class="{
                    'wk-select__label--small': v != '',
                    'wk-select__label--disabled': disabled,
                    'wk-select__label--incorrect': incorrect, 
                    'wk-select__label--correct': correct
                }"
            >
                {{ label }}
            </label>
            <div class="wk-select__input" :name="name" :id="el_id">
                <div class="wk-select__selected">
                    <span v-html="vText"></span>
                </div>
                <button class="wk-select__clear" v-if="!focus && v.length > 0 && clearable == true" @click.stop="clear">
                    <div class="wk-select__icon wk-select__times">
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <button class="wk-select__expand" :class="{'wk-select__expand--active': focus}">
                    <div class="wk-select__icon wk-select__caret">
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>
        </div>

        <transition name="fade">
            <div class="wk-select__msg" v-if="incorrect === true">
                {{ msg }}
            </div>
        </transition>

        <div class="wk-select__dropdown shadow--md" ref="dropdown" :data-hidden="!focus">
            <div class="wk-select__listwrapper">

                <div class="wk-select__selectedWrapper">
                    <div class="px-1 pt-1" style="margin-bottom: 5px" v-if="v.length > 0">
                        <h4 class="mt-0 mb-0 layout__h4">
                            Wybrane opcje
                        </h4>
                    </div>

                    <button class="wk-select__option wk-select__selectedOption" v-for="o in selectedOptions" :key="'selected_' + o.value" @click.stop="onOptionUnSelect(o.value)">
                        <WkCheckbox :value="true" />
                        <div v-html="o.text"></div>

                        <div class="wk-select__selectedOverlay">
                            <fa-icon icon="times"></fa-icon>
                            <div class="ml-1-2">Usuń opcję</div>
                        </div>
                    </button>
                </div>
                
                <div class="wk-select__dropdownhr" v-if="v.length > 0"></div>

                <button class="wk-select__option" v-for="o in unselectedOptions" :key="'unselected_' + o.value" @click.stop="onOptionSelect(o.value)" v-html="o.text"></button>

                <button class="wk-select__option" v-if="parsedOptions.length == 0" key="no-options" @click.stop>
                    {{noData}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { EventBus } from '../EventBus';
import { pluralize }  from '../helpers';

export default {
    data(){
        return {
            correct: false,
            incorrect: false,

            focus: false,

            v: [],

            popper: null,

            el_id: null
        }
    },

    watch: {
        value(v){
            this.v = v;
            this.validate();
        },
        id(){
            this.handleId();
        }
    },  

    computed: {
        parsedOptions(){

            return this.options.map((i)=>{
                return {
                    value: i[this.valueProp] || null,
                    text: i[this.textProp] || null
                }
            })
        },
        vText(){
            if(this.v.length == 0) return '';

            const names = [];
            for(let i = 0; i < this.v.length; i++){
                const ix = this.parsedOptions.find(_ => _.value == this.v[i]);
                if(ix) names.push(ix.text);
            }

            if(names.length < 3) return '<span class="text--bold">' + names.join(', ') + '</span>';
            else{
                return '<span class="text--bold">' + names[0] + ', ' + names[1] + '</span>' + pluralize( 
                    {
                        n: names.length - 2, 
                        values: ['', ' + 1 inny', ' + {{n}} inne', ' + {{n}} innych']
                    }
                );
            }
        },

        unselectedOptions(){
            return this.parsedOptions.filter(option => {
                return this.v.findIndex(_ => _ == option.value) === -1
            });
        },

        selectedOptions(){
            return this.parsedOptions.filter(option => {
                return this.v.findIndex(_ => _ == option.value) !== -1
            });
        }
    },


    methods: {

        async toggle(){
            if(this.disabled !== true){

                this.focus = !this.focus;

                await this.popper.update();
                await this.popper.update();

                if(this.focus == false) this.validate();
                else{
                    EventBus.$emit('wk-select-open', this.el_id);
                }
            } 
        },

        async validate(){
            if(!this.required){
                this.incorrect = false;
                this.correct = false;
                return true;
            }

            //presence
            if(this.required && this.v == ''){
                this.incorrect = true;
                this.correct = false;
                return false;
            }

            this.incorrect = false;
            this.correct = true;

            if(this.popper != null) await this.popper.update();
            
            return true;
        },

        onOptionSelect(v){
            this.v.push(v);
            this.$emit('input', this.v);
        },
        onOptionUnSelect(v){
            const ix = this.v.indexOf(v);
            if(ix !== -1){
                this.v.splice(ix, 1);
            }
        },

        clear(){
            if(this.disabled) return; 
            
            this.incorrect = false;
            this.correct = false;
            this.v = [];
            this.$emit('input', []);
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
        if(this.value.length > 0){
            this.v = this.value;
            this.validate();
        }
        this.handleId();

        this.popper = createPopper(this.$refs['select'], this.$refs['dropdown'], {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['top']
                    }
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 2]
                    }
                },
                {
                    name: 'sameWidth',
                    enabled: true,
                    phase: 'beforeWrite',
                    requires: [ 'computeStyles' ],
                    fn({ state }) {
                        state.styles.popper.width = `${state.rects.reference.width}px`;
                    },
                    effect({ state }) {
                        state.elements.popper.style.width = `${
                            state.elements.reference.offsetWidth
                        }px`;
                    }
                },
            ]
        });

        EventBus.$on('wk-select-open', id => {
            if(id != this.el_id && this.focus === true) this.toggle();
        });
    },
    
    props: {
        value: {
            type: Array,
            default(){
                return []
            }
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
        disabled: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default(){
                return []
            }
        },
        noData: {
            type: String,
            default: 'No data'
        },
        textProp: {
            type: String,
            default: 'name'
        },
        valueProp: {
            type: String,
            default: 'id'
        },
        clearable: {
            type: [String, Boolean],
            default: true
        },
        id: {
            type: String
        },
        name: {
            type: String,
            default: ''
        }
    }
}
</script>