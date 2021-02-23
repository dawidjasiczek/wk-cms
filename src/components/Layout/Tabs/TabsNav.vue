<template>
    <div class="wk-tabs__nav">
        <button 
            class="wk-tabs__navitem"
            :class="{
                'wk-tabs__navitem--active': currentName == pane.name
            }"

            @click="$emit('tab-click', pane.name)"

            v-for="pane in panes"
            :key="pane.name"
        >
            {{pane.label}}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        panes: {
            type: Array,
            default(){
                return []
            }
        },
        currentName: {
            type: String,
            default: ''
        }
    }
}
</script>