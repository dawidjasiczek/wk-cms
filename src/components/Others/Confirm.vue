<template>
    <div class="wk-confirm">
        <div 
            class="wk-confirm__content" 
            :class="{
                'wk-confirm__content--wider': wide
            }" 
            ref="popper" 
            :data-visible="popperVisible"
            v-if="showTooltip"
        >
            <template>
                <p class="text--bold my-0">{{title}}</p>
                <p class="wk-confirm__text my-0">{{msg}}</p>
                <div class="mt-1-2 flex justify--between">
                    <WkButton size="sm" type="plain" @click="cancelClick">{{cancelButtonText}}</WkButton>
                    <WkButton size="sm" :color="confirmButtonType" @click="confirmClick" classes="ml-1-2" >{{confirmButtonText}}</WkButton>
                </div>
            </template>
        </div>

        <div class="wk-confirm__reference" ref="reference"
            @click="showPopper"
        >
            <slot />
        </div>
    </div>
</template>

<script>

import { createPopper } from '@popperjs/core';

export default {

    data(){
        return{
            showTooltip: false,
            popperVisible: false,

            refE: null,
            popper: null,

            popperInstance: null,

            positions: ['top', 'left', 'right', 'bottom']
        }
    },

    methods: {
        cancelClick(){
            this.showTooltip = false;
            this.$emit("cancel")
        },
        confirmClick(){
            this.showTooltip = false;
            this.$emit("confirm")
        },
        getOtherPositions(exclusion){
            const a = [].concat(this.positions);
            const ix = a.indexOf(exclusion);
            if(ix !== -1) a.splice(ix, 1);
            return a;
        },
        showPopper(){
            this.showTooltip = true;
            this.$nextTick(_ => {
                this.refE = this.refE || this.$refs['reference'];
                this.popper = this.$refs['popper'];

                this.popperInstance = createPopper(this.refE, this.popper, {
                    placement: this.position,
                    modifiers: [
                        {
                            name: 'flip',
                            options: {
                                fallbackPlacements: this.getOtherPositions(this.position)
                            },
                        },
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 2]
                            }
                        }
                    ]
                });

                this.popperVisible = true;
            });
        },
        hidePopper(){
            if(this.popperInstance){
                this.popperInstance.destroy();
            }
            this.showTooltip = false;
            this.popperVisible = false;
        }
    },

    // mounted(){
        
    // },

    // destroyed() {
        
    // },
    

    props: {
        position: {
            type: String,
            default: 'top'
        },
        title: {
            type: String,
            default: 'Napewno chcesz usunąć?'
        },
        msg: {
            type: String,
            default: ''
        },
        confirmButtonType: {
            type: String,
            default: 'danger'
        },
        cancelButtonText: {
            type: String,
            default: 'Anuluj'
        },
        confirmButtonText: {
            type: String,
            default: 'Tak'
        },
        wide: {
            type: Boolean,
            default: false
        }
    }
}
</script>