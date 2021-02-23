<template>
    <div class="wk-tooltip">
        <div 
            class="wk-tooltip__content" 
            :class="{
                'wk-tooltip__content--wider': wide
            }" 
            ref="popper" 
            :data-visible="showTooltip"
        >
            <slot>No tooltip content</slot>
        </div>

        <div class="wk-tooltip__reference" ref="reference"
            @mouseover="showTooltip = true"
            @mouseleave="showTooltip = false"
        >
            <slot name="reference" />
        </div>
    </div>
</template>

<script>

import { createPopper } from '@popperjs/core';

export default {

    data(){
        return{
            showTooltip: false,

            refE: null,
            popper: null,

            popperInstance: null,

            positions: ['top', 'left', 'right', 'bottom']
        }
    },

    methods: {
        getOtherPositions(exclusion){
            const a = [].concat(this.positions);
            const ix = a.indexOf(exclusion);
            if(ix !== -1) a.splice(ix, 1);
            return a;
        }
    },

    mounted(){
        this.refE = this.refE || this.$refs['reference'];
        this.popper = this.$refs['popper'];

        // console.log(this)

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
    },

    destroyed() {
        if(this.popperInstance){
            this.popperInstance.destroy();
        }
    },
    

    props: {
        position: {
            type: String,
            default: 'right'
        },
        wide: {
            type: Boolean,
            default: false
        }
    }
}
</script>