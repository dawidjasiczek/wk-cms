<template>
    <div 
        class="wk-tag"
        :class="{
            'wk-tag--primary': type == 'primary',
            'wk-tag--secondary': type == 'secondary',
            'wk-tag--success': type == 'success',
            'wk-tag--danger': type == 'danger',
            'wk-tag--info': type == 'info',
            'wk-tag--gray': type == 'gray',
            'wk-tag--lg': size == 'lg',
            'wk-tag--sm': size == 'sm'
        }"
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'gray'
        },
        size: {
            type: String,
            default: ''
        }
    }
}
</script>