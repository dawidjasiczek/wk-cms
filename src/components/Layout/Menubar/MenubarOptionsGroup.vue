<template>
    <div>
        <button
            class="wk-menubar__option wk-menubar__optionsgroup"
            @click="toggleSublist"
        >
            <div class="wk-menubar__optionicon">
                <slot name="icon" />
            </div>
            <div class="wk-menubar__optionname wk-menubar__optionsgroupname">
                <slot />
            </div>
            <div class="wk-menubar__optionsgrouptoggler"
                :class="{
                    'wk-menubar__optionsgrouptoggler--opened': opened
                }"
            >
                <fa-icon icon="chevron-down" />
            </div>
        </button>
        <WkAnimatedCollapse
            :show="opened"
            @toggle="(state) => opened = state"
        >
            <div class="wk-menubar__optionslist">
                <router-link 
                    class="wk-menubar__suboption"
                    :active-class="'wk-menubar__suboption--active'"
                    tag="a"
                    :to="entry.to"
                    exact

                    v-for="(entry, index) in options"
                    :key="index"
                >
                    {{ entry.name }}
                </router-link>
            </div>
        </WkAnimatedCollapse>
    </div>
</template>

<script>
import { EventBus } from '../../EventBus';
export default {
    data(){
        return {
            opened: false
        }
    },
    props: {
        options: {
            type: Array,
            default(){
                return [];
            }
        }
    },

    methods: {
        toggleSublist(){
           this.opened = !this.opened;
           EventBus.$emit('menubar-options-group-toggle', this.opened);
        }
    }
}
</script>