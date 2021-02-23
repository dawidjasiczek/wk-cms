<template>
    <div 
        class="wk-buttons-group"
        :class="{
            'wk-buttons-group--disabled': disabled
        }"
    >
        <div class="wk-buttons-group__inner">

            <div 
                class="wk-buttons-group__overlay"
                :class="{
                    'wk-buttons-group__overlay--hidden': value == ''
                }"
                :style="{
                    'width': '64px',
                    'transform': 'translateX(' + overlayOffset +'%)'
                }"
            >
                <div class="wk-buttons-group__overlayc"></div>
            </div>

            <button 
                class="wk-buttons-group__button"
                :class="{'wk-buttons-group__button--active': value == item[dataValue]}"
                v-for="(item, index) in data"
                :key="item[dataValue]"
                @click="handleClick(item[dataValue])"
                :ref="'btn-' + index"
            >
                <template v-if="labelFormatter == ''">
                    {{ getLabel(item) }}
                </template>
                <template v-else>
                    {{ labelFormatter.replace(/{value}/g, getLabel(item)) }}
                </template>
            </button>

            
        </div>
    </div>
</template>

<script>
export default {
    
    props: {
        data: {
            type: Array,
            default(){
                return []
            }
        },
        dataValue: {
            type: String,
            default: 'value'
        },
        dataLabel: {
            type: String,
            default: 'label'
        },
        labelFormatter: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleClick(payload){
            if(!this.disabled){
                this.$emit('change', payload);
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
        }
    },

    computed:{
        overlayOffset(){
            
            if(this.value == '') return 0;

            const ix = this.data.findIndex(_ => _[this.dataValue] == this.value);
            if(ix === -1) return 0;

            return Math.round(ix * 100);
        }
    }

}
</script>