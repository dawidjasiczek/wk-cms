<template>
    <transition-group name="wk-alert" tag="div" class="wk-alerts">
        <div 
            v-for="msg in alerts"
            :key="msg.id"
            class="wk-alerts__alert"
            :class="{
                'wk-alerts__alert--error': msg.type == 'error',
                'wk-alerts__alert--success': msg.type == 'success',
                'wk-alerts__alert--info': msg.type == 'info'
            }"    
        >
            <div class="wk-alerts__text">
                {{msg.msg}}
            </div>
            <div class="wk-alerts__cta">
                <button 
                    class="wk-alerts__close"
                    @click="removeAlert(msg.id)"
                >
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </transition-group>
</template>

<script>
export default {
    computed: {
        alerts(){
            return this.$store.state.alerts;
        }
    },
    methods: {
        removeAlert(id){
            this.$store.commit('removeAlert', id);
        }
    }
}
</script>