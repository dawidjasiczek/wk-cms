<template>
    <div class="animated-collapse" ref="collapse">
        <slot />
    </div>
</template>

<script>
import { EventBus } from '../EventBus';

export default {
    data(){
        return {
            id: (Date.now() + Math.random() * 100000).toString(16),
            animating: false,
            q: false,
            lastShow: false
        }
    },

    props: {
        show: {
            type: Boolean,
            default: false
        },
        remainOpen: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        show(){
            this.handleShow();
        }
    },
    computed: {
        el(){
            return this.$refs['collapse'];
        }
    },

    methods: {
        handleShow(noAnimation = false){
            if(this.show === true){
                this.open(400, noAnimation);
            }
            else{
                this.close(400, noAnimation);
            }
        },
        open(duration, noAnimation = false){
            
            if(this.animating) return this.q = true;
            this.animating = true;

            EventBus.$emit('biurko-animated-collapse-open', this.id);
            this.$emit('toggle', this.show);

            this.el.style.removeProperty('display'); 
            let display = window.getComputedStyle(this.el).display;
            if (display === 'none') {
                display = 'block';
            }
            this.el.style.display = display;

            let height = this.el.offsetHeight;
            this.el.style.height = 0;
            this.el.style.paddingTop = 0; 
            this.el.style.paddingBottom = 0; 
            this.el.style.marginTop = 0; 
            this.el.style.marginBottom = 0; 
            this.el.style.overflow = 'hidden'; 

            setTimeout(_ => {
                this.el.style.boxSizing = 'border-box'; 

                if(!noAnimation){
                    this.el.style.transitionProperty = "height, margin, padding";  
                    this.el.style.transitionDuration = duration + 'ms';
                    this.el.style.transitionTimingFunction = "ease";
                }

                this.el.style.height = height + 'px'; 
                this.el.style.removeProperty('padding-top');  
                this.el.style.removeProperty('padding-bottom'); 
                this.el.style.removeProperty('margin-top'); 
                this.el.style.removeProperty('margin-bottom');

                setTimeout(_ => {
                    this.el.style.removeProperty('height'); 
                    this.el.style.removeProperty('overflow'); 
                    this.el.style.removeProperty('transition-duration'); 
                    this.el.style.removeProperty('transition-property'); 
                    this.el.style.removeProperty('transition-timing-function'); 

                    this.lastShow = this.show;
                    this.animating = false;
                    if(this.q === true && this.show !== this.lastShow) {
                        this.handleShow();
                    }

                }, (noAnimation ? 1 : duration));
            }, 1);
        },
        close(duration, noAnimation = false){

            if(this.animating) return this.q = true;
            this.animating = true;

            this.$emit('toggle', this.show);
            
            if(!noAnimation){
                this.el.style.transitionProperty = 'height, margin, padding';
                this.el.style.transitionDuration = duration + 'ms'; 
                this.el.style.transitionTimingFunction = "ease";
            }
            
            this.el.style.boxSizing = 'border-box'; 
            this.el.style.height = this.el.offsetHeight + 'px'; 

            setTimeout(_ => {
                this.el.style.height = 0;
                this.el.style.paddingTop = 0;
                this.el.style.paddingBottom = 0;
                this.el.style.marginTop = 0;
                this.el.style.marginBottom = 0;
                this.el.style.overflow = 'hidden';

                setTimeout(_ => {
                    this.el.style.display = 'none'; 
                    this.el.style.removeProperty('height');
                    this.el.style.removeProperty('padding-top');  
                    this.el.style.removeProperty('padding-bottom');
                    this.el.style.removeProperty('margin-top'); 
                    this.el.style.removeProperty('margin-bottom');  
                    this.el.style.removeProperty('overflow'); 

                    if(!noAnimation){
                        this.el.style.removeProperty('transition-duration'); 
                        this.el.style.removeProperty('transition-property');  
                        this.el.style.removeProperty('transition-timing-function');
                    }

                    this.lastShow = this.show;
                    this.animating = false;
                    if(this.q === true && this.show !== this.lastShow) {
                        this.handleShow();
                    }
                    
                }, (noAnimation ? 1 : duration));
            }, 1);

        }
    },

    mounted(){
        if(!this.remainOpen){
            EventBus.$on('biurko-animated-collapse-open', id => {
                if(id != this.id) this.$emit('toggle', false);
            });
        }
        this.handleShow(true);
    }
}
</script>