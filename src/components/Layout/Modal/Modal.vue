<template>
    <transition name="wk-modal" appear >
        <div class="wk-modal" v-if="show" @click="onClickOutside" :class="{
        'wk-modal--big': size == 'big',
        'wk-modal--full': size == 'full'
        }">
            <div class="wk-modal__body rounded shadow p-2" @click.stop>
                <div class="wk-modal__content">
                    <slot />
                </div>
                <div class="wk-modal__ctas">
                    <button class="btn btn--plain" 
                    v-if="cancelButtonText != ''"
                    @click="$emit('cancel', true)">
                        {{ cancelButtonText }}
                    </button>
                    <button 
                        class="btn relative" 
                        :class="{
                            'btn--danger': (confirmButtonType == 'danger'),
                            'btn--success': (confirmButtonType == 'success'),
                            'btn--info': (confirmButtonType == 'info'),
                            'btn--primary': (confirmButtonType == 'primary'),
                            'btn--secondary': (confirmButtonType == 'secondary')
                        }" 
                        :disabled="loading"
                        @click="$emit('confirm', true)"
                    >
                        <span>
                            {{ confirmButtonText }}
                        </span>
                        <WkSpinner :show="loading" />
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    
    props: {
        show: {
            type: Boolean,
            default: false
        },
        confirmButtonText: {
            type: String,
            default: 'Tak'
        },
        confirmButtonType: {
            type: String,
            default: 'danger'
        },
        cancelButtonText: {
            type: [String, Boolean],
            default: 'Anuluj'
        },
        loading: {
            type: Boolean,
            default: false
        },
        enableClickOutside: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'normal'
        }
    },

    methods: {
        onClickOutside(){
            if(this.enableClickOutside) this.$emit('cancel', true);
        }
    }
}
</script>