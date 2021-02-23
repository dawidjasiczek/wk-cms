<template>
    <div 
        class="wk-hint"
        :class="{
            'wk-hint--danger': type == 'danger',
            'wk-hint--info': type == 'info'
        }"
    >
        <div class="wk-hint__icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 123.996 123.996" style="enable-background:new 0 0 123.996 123.996;"  xml:space="preserve"
                v-if="type == 'danger'"
                class="wk-hint__danger"
            >
                <g>
                    <path d="M9.821,118.048h104.4c7.3,0,12-7.7,8.7-14.2l-52.2-92.5c-3.601-7.199-13.9-7.199-17.5,0l-52.2,92.5C-2.179,110.348,2.521,118.048,9.821,118.048z M70.222,96.548c0,4.8-3.5,8.5-8.5,8.5s-8.5-3.7-8.5-8.5v-0.2c0-4.8,3.5-8.5,8.5-8.5s8.5,3.7,8.5,8.5V96.548z M57.121,34.048h9.801c2.699,0,4.3,2.3,4,5.2l-4.301,37.6c-0.3,2.7-2.1,4.4-4.6,4.4s-4.3-1.7-4.6-4.4l-4.301-37.6C52.821,36.348,54.422,34.048,57.121,34.048z"/>
                </g>
            </svg>

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 460 460" style="enable-background:new 0 0 460 460;" xml:space="preserve"
                v-else
                class="wk-hint__info"
            >
                <g>
                    <g>
                        <path d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39S251.539,157,230,157z"/>
                    </g>
                </g>
            </svg>
        </div>
        <div class="wk-hint__details">
            <h6 class="wk-hint__title">
                {{ title }}
            </h6>
            <div class="wk-hint__text">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    props: {
        title: {
            type: String,
            default: 'Alert title'
        },
        type: {
            type: String,
            default: 'danger'
        }
    }
}
</script>