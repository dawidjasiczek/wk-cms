<template>
 
        <div v-bind:class="classObject">
            <slot />
        </div>

</template>

<script>
export default {
    computed:{
        classObject(){
            const obj = {}

            if(this.span !== null || this.xs !== null){
                obj['col-xs-'+(this.span || this.xs)] = true
            }
            if(this.sm !== null){
                obj['col-sm-'+this.sm] = true
            }
            if(this.md !== null){
                obj['col-md-'+this.md] = true
            }
            if(this.lg !== null){
                obj['col-lg-'+this.lg] = true
            }
            if(this.xl !== null){
                obj['col-xl-'+this.xl] = true
            }

             if(this.offset !== null || this.offsetXs !== null){
                obj['off-xs-'+(this.offset || this.offsetXs)] = true
            }
            if(this.offsetSm !== null){
                obj['off-sm-'+this.offsetSm] = true
            }
            if(this.offsetMd !== null){
                obj['off-md-'+this.offsetMd] = true
            }
            if(this.offsetLg !== null){
                obj['off-lg-'+this.offsetLg ] = true
            }
            if(this.offsetXl  !== null){
                obj['off-xl-'+this.offsetXl] = true
            }
            obj['mb-'+this.mb] = true
            return obj
        }
    },
    props: {
        span: {
            type: [String, Number],
            default: null
        },
        offset: {
            type: [String, Number],
            default: null
        },
        xs: {
            type: [String, Number],
            default: null
        },
        sm: {
            type: [String, Number],
            default: null
        },
        md: {
            type: [String, Number],
            default: null
        },
        lg: {
            type: [String, Number],
            default: null
        },
        xl: {
            type: [String, Number],
            default: null
        },
        offsetXs: {
            type: [String, Number],
            default: null
        },
        offsetSm: {
            type: [String, Number],
            default: null
        },
        offsetMd: {
            type: [String, Number],
            default: null
        },
        offsetLg: {
            type: [String, Number],
            default: null
        },
        offsetXl: {
            type: [String, Number],
            default: null
        },
        mb:{
            type: [String, Number],
            default: "1"
        }
    }
}
</script>