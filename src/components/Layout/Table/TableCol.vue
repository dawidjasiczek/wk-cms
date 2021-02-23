<template>
    <td
        :style="getStyle"
    >
        <slot />
    </td>
</template>

<script>
export default {

    name: "TableCol",

    props: {
        label: {
            type: String,
            required: true
        },
        width: {
            type: [String, Number]
        },
        textAlign: {
            type: String,
            default: 'left'
        }
    },

    computed: {
        getStyle(){
            const o = {};

            if(typeof this.width == 'number' || (/^[0-9]+$/).test(this.width)){
                o.width = this.width + 'px';
            }
            else{
                o.width = this.width;
            }

            if(this.textAlign == 'right'){
                o.textAlign = 'right';
            }
            else if(this.textAlign == 'center'){
                o.textAlign = 'center';
            }
            else if(this.textAlign == 'justify'){
                o.textAlign = 'justify';
            }
            else if(this.textAlign == 'left'){
                o.textAlign = 'left';
            }

            return o;
        }
    },

    methods: {
        setWatchers(){
            const propsToWatch = ['label', 'width', 'textAlign'];
            for(let i = 0; i < propsToWatch.length; i++){
                this.$watch(propsToWatch[i], v => {
                    this.$parent.$parent.updateCol({
                        name: this.label,
                        style: this.getStyle
                    });
                });
            }
        }
    },

    mounted(){
        this.$parent.$parent.registerCol({
            name: this.label,
            style: this.getStyle
        });

        this.setWatchers();
    },
    beforeDestroy(){
        this.$parent.$parent.unregisterCol({
            name: this.label
        });
    }
}
</script>