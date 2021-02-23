<template>
    <div class="wk-input" >
        <div
            class="wk-radio" :class="{
                'wk-radio--disabled': disabled,
            }"
            @click="toggle()"
        >
            <input type="radio" class="wk-radio-i" :name="name" ref="rbtn">
            <div class="wk-radio-box">
                <div class="wk-radio-selected">
                </div>
            </div>
            <div class="wk-radio-label">
                {{label}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toggle(ev){
            if(this.disabled){
                return;
            }
            if(this.$refs.rbtn.checked == true){
                this.$refs.rbtn.checked = false;
                this.$emit('input', false);
                this.$emit('changed', false);
                
            }else{
                this.$refs.rbtn.checked = true;
                this.$emit('input', this.data);
                this.$emit('changed', this.data);
            }
        }
    },
    mounted: function(){
        if(this.selected) this.$refs.rbtn.checked = true
    },
    props: {
        selected: {
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: "Label goes here"
        },
        data: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        }
    }
}
</script>