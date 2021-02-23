<template>
    <div class="wk-table__wrapper">
        <div class="wk-table__container">
            <WkTableHeader 
                :expandable="expandable"
                :columns="columns"
            />
          
            
            <!-- LOADER -->
            <WkTableLoader 
                v-if="internalLoading && !enableInfinityScroll"
            />
            <!-- DATA -->
            <table 
                class="wk-table__table" 
                :class="{
                    'wk-table__table--expandable': expandable
                }" 
                v-else-if="(!internalLoading || enableInfinityScroll) && data.length > 0"
            >
                <transition-group tag="tbody" :name="(animated ? 'wk-table' : '')">
                    <template v-for="(d, index) in data">
                        <tr 
                            :key="(rowKeyProp == 'random' ? (Math.floor(Date.now() + Math.random() * 100000)).toString(16) : d[rowKeyProp] + '_regular')"
                            class="wk-table__regulartr"
                        >
                            <td 
                                class="wk-table__expandabletrigger" 
                                :class="{
                                    'wk-table__expandabletrigger--expanded': d.___expanded === true
                                }" 
                                style="width: 45px"
                                v-if="expandable" 
                                @click="(d.___expanded === true ? $set(d, '___expanded', false) : $set(d, '___expanded', true))"
                            >
                                <fa-icon icon="caret-down" />
                            </td>
                            <slot :row="d" :index="index" />
                        </tr>
                        <tr
                            :key="(rowKeyProp == 'random' ? (Math.floor(Date.now() + Math.random() * 100000)).toString(16) : d[rowKeyProp] + '_expandable')"
                            v-if="expandable"
                            class="wk-table__expandabletr"
                        >
                            <td :colspan="numberOfColumns">
                                <AnimatedCollapse :show="d.___expanded === true">
                                    <div class="wk-table__expandablewrapper">
                                        <slot name="expandable" :row="d" />
                                    </div>
                                </AnimatedCollapse>
                            </td>
                        </tr>
                    </template>
                </transition-group>
            </table>
            <table class="wk-table__table" v-else>
                <tbody>
                    <tr>
                        <td
                            :colspan="numberOfColumns"
                            class="text--center"
                        >
                            {{ noData }}
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>

        <div class="wk-table__pagination"
            v-if="enablePagination"
        >
            <button 
                class="btn btn--sm btn--primary"
                @click="setPaginationPage('-1')"
                :disabled="paginationPage == 1 || loading"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 17.898C15 18.972 13.7351 19.546 12.9268 18.8388L6.61617 13.3169C5.81935 12.6197 5.81935 11.3801 6.61617 10.6829L12.9268 5.16108C13.7351 4.45388 15 5.02785 15 6.1018L15 17.898Z" fill="#ffffff"/>
                </svg>
            </button>

            <div class="ml-1">
                Strona
            </div>

            <input 
                type="text" 
                class="wk-table__paginationinput" 
                :disabled="loading"
                :value="paginationPage"
                @keypress.enter="($event) => { setPaginationPage($event.srcElement.value); $event.srcElement.blur() }"
            >

            <div class="mr-1">
                z {{ paginationPages }}
            </div>

            <button 
                class="btn btn--sm btn--primary"
                @click="setPaginationPage('+1')"
                :disabled="paginationPage == paginationPages || loading"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17.898C9 18.972 10.2649 19.546 11.0731 18.8388L17.3838 13.3169C18.1806 12.6197 18.1806 11.3801 17.3838 10.6829L11.0731 5.16108C10.2649 4.45388 9 5.02785 9 6.1018V17.898Z" fill="#ffffff"/>
                </svg>
            </button>
        </div>

        <template v-if="enableInfinityScroll && !loading">
            <ext-intersect  
            @enter="handleIntersectEnter"
            @leave="handleIntersectLeave"
            :threshold="[0]"
            >
                <div class="intersect" style="height: 2px;"></div>
            </ext-intersect>
        </template>
        
    </div>
</template>

<script>
import  WkTableLoader  from "./TableLoader"
import  WkTableHeader  from "./TableHeader"
import extIntersect from 'vue-intersect'

export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        expandable: {
            type: Boolean,
            default: false
        },
        animated: {
            type: Boolean,
            default: true
        },

        enablePagination: {
            type: Boolean,
            default: false
        },
        paginationPage: {
            type: Number,
            default: 1
        },
        paginationPages: {
            type: Number,
            default: 1
        },

        data: {
            type: [Array, Object],
            default(){
                return []
            }
        },
        noData: {
            type: String,
            default: 'No data to display'
        },

        enableInfinityScroll: {
            type: Boolean,
            default: false
        },

        rowKeyProp: {
            type: String,
            default: 'random'
        }
    },

    data(){
        return {
            columns: [],

            internalLoading: false,
            loadingSince: 0,
            loadingH: null,


            infinityScrollQueue: []
        }
    },

    computed: {
        numberOfColumns(){
            return this.columns.length + (this.expandable ? 1 : 0);
        }
    },
    components: {
        WkTableHeader,
        WkTableLoader,
        extIntersect
    },  
    watch: {
        loading(newValue){
            this.handleLoading();

            if(newValue == false && this.enableInfinityScroll === true && this.infinityScrollQueue.length > 0){
                this.infinityScrollQueue[0]();
            }
        }
    },

    methods: {
        ///INTERSECT
        handleIntersectEnter(){
            if(this.loading) return this.infinityScrollQueue.push('setPaginationPage');

            if(this.paginationPage < this.paginationPages){
                this.setPaginationPage();
            }
            else{
                this.infinityScrollQueue = [];
            }
        },
        handleIntersectLeave(){
            this.infinityScrollQueue = [];
        },

        ////
        setPaginationPage(state = "+1"){
            let diff = this.paginationPage;

            if(state == '-1'){
                diff -= 1;
            }
            else if(state == '+1'){
                diff += 1;
            }
            else{
                diff = parseInt(state);
            }

            if(isNaN(diff)) diff = 1;

            if(diff < 1) diff = 1;
            else if(diff > this.paginationPages) diff = this.paginationPages;

            this.$emit('pagination-page-select', diff);
        },

        registerCol(o){
            const ix = this.columns.findIndex(_ => _.name == o.name);
            if(ix === -1){
                this.columns.push({
                    ...o,
                    q: 1
                });
            }
            else{
                this.columns[ix].q += 1;
            }
        },
        unregisterCol(o){
            const ix = this.columns.findIndex(_ => _.name == o.name);
            if(ix !== -1){
                if(this.columns[ix].q > 1) {
                    this.columns[ix].q -= 1;
                }
                else{
                    this.columns.splice(ix, 1);
                }
            }
        },
        updateCol(o){
            const ix = this.columns.findIndex(_ => _.name == o.name);
            if(ix !== -1){
                this.columns[ix].name = o.name;
                this.columns[ix].style = o.style;
            }
        },

        handleLoading(){
            //loader pokazuje się tylko jeżeli ładowanie trwa > 100ms
            if(this.loading == true){

                clearTimeout(this.loadingH); //czyszczenie jeżeli false się jeszcze nie zdążył wykonać

                this.loadingH = setTimeout(_ => {
                    this.internalLoading = true;
                    this.loadingSince = Date.now(); //zapisanie od kiedy trwa ładowanie
                }, 100);
            }
            else{
                //czyszczenie timeouta jeżeli internalLoading nie zdążył się rozpocząć
                clearTimeout(this.loadingH);
                
                //ładowanie musi trwać chociaż 100ms 
                const diff = Date.now() - this.loadingSince;
                if(diff >= 100){
                    this.internalLoading = false;
                    this.loadingSince = 0;
                }
                else{
                    //odpowiedni timeout
                    this.loadingH = setTimeout(_ => {
                        this.internalLoading = false;
                        this.loadingSince = 0;
                    }, 100 - diff);
                }
            }
        }
    },

    mounted(){
        this.handleLoading();
    }
}
</script>