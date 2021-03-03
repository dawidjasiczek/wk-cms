<template>
    <div class="wk-select"  v-click-outside="() => { if(focus == true) toggle() }">
        <div class="wk-select__inner"
            :class="{
                'wk-select__inner--focus': focus,
                'wk-select__inner--disabled': disabled,
                'wk-select__inner--incorrect': incorrect, 
                'wk-select__inner--correct': correct
            }"
            style="overflow: hidden"
            @click="toggle"
            ref="select"
        >
            <label class="wk-select__label"
                :class="{
                    'wk-select__label--small': focus || v != '',
                    'wk-select__label--disabled': disabled,
                    'wk-select__label--incorrect': incorrect, 
                    'wk-select__label--correct': correct
                }"
            >
                {{ label }}
            </label>
            <div class="wk-select__input" :name="name" :id="el_id" >
                <div class="wk-select__selected" v-if="!focus && v != ''">
                    <span v-html="selectedOption.text"></span>
                </div>
                <div class="wk-select__selected" v-else>
                    <input type="text" ref="input" @input="debounceSearch" v-model="searchValue" v-if="focus">
                </div>
                <button class="wk-select__clear" v-if="!focus && v != '' && clearable == true" @click.stop="clear">
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

                <WkSpinner :show="searching" color="#0d1842" />
            </div>
        </div>

        <transition name="fade">
            <div class="wk-select__msg" v-if="incorrect === true">
                {{ msg }}
            </div>
        </transition>

        <div class="wk-select__dropdown shadow--md" ref="dropdown" :data-hidden="(focus == false || (focus == true && searched == false))">
            <div class="wk-select__listwrapper">
                <button class="wk-select__option" v-for="o in filteredOptions" :key="o.value" @click.stop="setV(o.value)" v-html="o.text"></button>

                <button class="wk-select__option" v-if="options.length == 0 || (v != '' && options.length == 1)" key="no-options" @click.stop>
                    {{noData}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { EventBus } from '../EventBus';

export default {
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
        disabled: {
            type: Boolean,
            default: false
        },
        noData: {
            type: String,
            default: 'No data'
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
        },
        textProp: {
            type: String,
            default: "name"
        },
        valueProp: {
            type: String,
            default: 'id'
        },
        dataProp: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        searchParam: {
            type: String,
            default: 's'
        },
        singleItemUrl: {
            type: String,
            required: true
        },
        singleItemDataProp: {
            type: String,
            required: true
        }
    },

    data(){
        return {
            correct: false,
            incorrect: false,

            focus: false,

            v: '',

            popper: null,

            options: [],
            searchValue: '',
            searching: false,
            searchDebouncer: null,
            searched: false,

            selectedOption: null,

            el_id: null
        }
    },

    watch: {
        value(){
            if(this.value != this.v){
                this.getSingleOption();
            }
        },
        id(){
            this.handleId();
        }
    },  

    computed: {
        filteredOptions(){
            if(this.selectedOption !== null){
                return this.options.filter(item => {
                    return item.value != this.selectedOption.value
                });
            }
            return this.options;
        }
    },

    methods: {

        async toggle(){
            if(this.disabled !== true){

                this.focus = !this.focus;

                await this.popper.update();
                await this.popper.update();

                if(this.focus == false) {
                    this.validate();
                    if(this.selectedOption && this.searchValue != this.selectedOption.text) this.searchValue = this.selectedOption.text;
                }
                else{
                    EventBus.$emit('wk-select-open', this.el_id);
                    this.$nextTick(_ => {
                        this.$refs['input'].focus();
                    })
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

        setV(v){
            const ix = this.options.findIndex(_ => _.value == v);
            this.v = v;

            if(v == ''){
                this.selectedOption = null;
                this.searchValue = '';
            }
            else{
                if(ix !== -1) this.selectedOption = JSON.parse(JSON.stringify(this.options[ix]));
                this.$emit('input', v);
                this.searchValue = this.selectedOption.text;
                if(this.focus == true) this.toggle();
            }    
        },

        clear(){
            if(this.disabled) return; 
            
            this.incorrect = false;
            this.correct = false;
            this.setV('');
            this.validate();
        },

        handleId(){
            if(this.id && this.id != ''){
                this.el_id = this.id
            }
            else{
                this.el_id = (Date.now() + Math.floor(Math.random() * 100000)).toString(16);
            }
        },

        handleSearch($ev){
            if(this.searching) {
                $ev.srcElement.value = this.searchValue;
                return;
            }
            this.searchValue = $ev.srcElement.value;
            this.doSearch();
        },
        debounceSearch(){
            clearTimeout(this.searchDebouncer);
            this.searchDebouncer = setTimeout(_ => {
                this.doSearch();
                this.searchDebouncer = null;
            }, 350);
        },
        async doSearch(){
            if(this.searching) return;
            this.searching = true;
            try{
                const r = await this.$axios.$get(this.url + '?' + this.searchParam + '=' + this.searchValue);

                if(r[this.dataProp] && Array.isArray(r[this.dataProp])){
                    const arr = [];
                    for(let i = 0; i < r[this.dataProp].length; i++){
                        arr.push({
                            value: r[this.dataProp][i][this.valueProp],
                            text: this.getTextFromResponseObj(r[this.dataProp][i], this.textProp)
                        });
                    }
                    this.options = arr;
                    this.searched = true;
                } 
            }
            catch(err){
                console.error(err);
            }
            this.searching = false;
        },
        getTextFromResponseObj(obj, prop){
            prop = prop.split('.');
            let o = obj;
            for(let i = 0; i < prop.length; i++){
                o = o[prop[i]];
            }
            return o;
        },

        async getSingleOption(){
            if(this.value == '') {
                this.setV('');
                return;
            }
            try{
                const r = await this.$axios.$get(this.singleItemUrl.replace(':value', this.value));

                if(r && r[this.singleItemDataProp]){
                    this.selectedOption = {
                        text: this.getTextFromResponseObj(r[this.singleItemDataProp], this.textProp),
                        value: r[this.singleItemDataProp][this.valueProp]
                    }
                    this.v = r[this.singleItemDataProp][this.valueProp];
                    this.searchValue = this.selectedOption.text;
                }

                this.validate();
            }
            catch(err){}
        }
    },

    mounted(){
        if(this.value != ''){
            this.getSingleOption();
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
    }
}
</script>