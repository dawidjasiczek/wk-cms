<template>
    <div class="wk-menubar__group">
        <h4 class="wk-menubar__groupname">
            {{ name }}
        </h4>
        <div class="wk-menubar__groupcontent">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "MenubarGroup",
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>