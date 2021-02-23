<template>
    <WkModal
        :show="show"
        :confirmButtonText="confirmButtonText"
        :confirmButtonType="confirmButtonType"
        :cancelButtonText="cancelButtonText"

        @cancel="handleAction('cancel')"
        @confirm="handleAction('confirm')"
    >
        <p>
            {{ text }}
        </p>
        <WkInput
            :label="inputLabel"
            v-if="showInput"
            required
            ref="input"
            :msg="inputMsg"
            v-model="inputValue"
        />
    </WkModal>
</template>

<script>
export default {
    
    data(){
        return {
            show: false,
            confirmButtonText: 'Tak',
            confirmButtonType: 'success',
            cancelButtonText: 'Anuluj',
            text: 'Default Message Box Text',
            showInput: false,
            inputLabel: 'Default Input Label',
            inputMsg: 'Default Input Error Msg',
            inputValue: ''
        }
    },
    methods: {
        handleAction(action){
            if(action == 'cancel'){
                this.$emit('cancel', true);
            }
            else{
                if(this.showInput){
                    if(this.$refs['input'].validate()){
                        this.$emit('confirm', this.inputValue);
                    }
                    else{
                        return;
                    }
                }
                else{
                    this.$emit('confirm', true);
                }
            }
        }
    }
}
</script>