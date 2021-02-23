<template>
    <router-link
        tag="a"
        class="wk-menubar__option"
        :to="to"
        :active-class="'wk-menubar__option--active'"
        exact
    >
        <div class="wk-menubar__optionicon">
            <slot name="icon" />
        </div>
        <div class="wk-menubar__optionname">
            <slot />
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: [Object, Function, String],
            default: 'dashboard'
        }
    }
}
</script>