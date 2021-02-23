<template>
    <div class="wk-tabs__pane" v-show="active">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'WkTabsPane',

    props: {
        name: String,
        label: String
    },

    computed: {
        active(){
            return this.$parent.currentName == this.name;
        }
    }
}
</script>