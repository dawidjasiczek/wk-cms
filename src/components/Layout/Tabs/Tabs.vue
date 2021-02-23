<script>
import TabsNav from './TabsNav';

export default {
    name: 'WkTabs',

    props: {
        value: {
            type: String,
            default: ''
        }
    },

    data(){
        return {
            currentName: this.value,
            panes: []
        }
    },

    watch: {
        value(v){
           this.setCurrentName(v); 
        }
    },

    methods: {
        calcPaneInstances(isForceUpdate = false) {
            if (this.$slots.default) {
                const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
                    vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'WkTabsPane');

                const panes = paneSlots.map(({ componentInstance }) => componentInstance);

                const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));

                if (isForceUpdate || panesChanged) {
                    this.panes = panes;
                }
            } else if (this.panes.length !== 0) {
                this.panes = [];
            }
        },
        handleTabClick(tab) {
            this.setCurrentName(tab);
            this.$emit('tab-click', tab);
        },
        setCurrentName(value) {
            this.currentName = value;
            this.$emit('input', value);
        }
    },

    components: {
        TabsNav
    },

    render(h){

        const navData = {
            props: {
                currentName: this.currentName,
                panes: this.panes
            },
            ref: 'nav',
            on: {
                'tab-click': this.handleTabClick
            }
        }

        const header = (
            <div class="wk-tabs__header">
                <TabsNav { ...navData }></TabsNav>
            </div>
        );

        const panels = (
            <div class="wk-tabs__content">
                { this.$slots.default }
            </div>
        );

        return (
            <div 
                class={{
                    'wk-tabs': true
                }}
            >
               { [header, panels] }
            </div>
        );
    },

    mounted() {
      this.calcPaneInstances();
    },
    updated() {
      this.calcPaneInstances();
    }
}
</script>