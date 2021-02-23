<template>
    <div class="wkfm-inputs" >
        <WkInput
        @keydown.native.enter="enter"
          label="Nazwa"
          :value="value"
          @input="emitInput"
          ref="Nazwa"
          :msg="msg"
          :regex="pattern"
            required="true"
        />
    </div>
</template>
<style lang="scss">

</style>
<script>
import {file_name_reg, dir_name_reg} from './const'

export default {
    data() {
        return{
            error: "",
            nazwa: "",
            pattern: dir_name_reg,
            msg: ""
        }
    },
    props: {
        entry: {
            type: Object,
            default: ()=>{
                return {}
            }
        },
        value: {
            type: String,
            default:  ""
        }
    },
    computed:{
        
    },
    mounted() {
        if(this.entry.entry_type == "dir"){
            this.pattern = dir_name_reg
            this.msg = "Nieprawidłowa nazwa folderu"
        }else if(this.entry.entry_type == "file"){
            this.pattern = file_name_reg,
            this.msg = "Nieprawidłowa nazwa pliku"
        }
    },
    methods:{ 
        enter(){
            
            this.$emit('enter-pressed')
            
        },
        emitInput(value){
            this.$emit('input', value)
        }
    },
    components:{
    }     
}
</script>
