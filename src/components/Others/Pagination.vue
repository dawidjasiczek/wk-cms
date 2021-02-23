<template>
    <div class="wk-pagination">
        <div class="wk-pagination__pages">
            Strona {{page}} z {{pageMax}}
        </div>
        <div class="wk-pagination__buttons">
            <button class="btn btn--secondary wk-pagination__pageb wk-pagination__pageb--leftend"  v-if="getPage > 1" @click="onPageChange(getPage - 1)" title="Poprzednia strona">
                <fa-icon icon="caret-left" />
            </button>
            
            <button class="btn btn--secondary wk-pagination__pageb" v-if="getPage > 1" @click="onPageChange(1)">
                1
            </button>

            <div v-if="getPage < 4 && getPage > 1">
                <button class="btn btn--secondary wk-pagination__pageb" v-for="n in getPrePagesSmArray" :key="n" @click="onPageChange(n)">
                    {{n}}
                </button>
            </div>
            <div v-else-if="getPage >= 4">
                <span class="wk-pagination__pageb wk-pagination__pageb--dots">
                    ...
                </span>
                <button class="btn btn--secondary wk-pagination__pageb" @click="onPageChange(getPage - 1)">
                    {{getPage - 1}}
                </button>
            </div>


            <button class="btn btn--primary wk-pagination__pageb">{{getPage}}</button>


            <div v-if="getMaxPage - getPage > 2">
                <button class="btn btn--secondary wk-pagination__pageb" @click="onPageChange(getPage + 1)">
                    {{getPage + 1}}
                </button>
                <span class="wk-pagination__pageb wk-pagination__pageb--dots">
                    ...
                </span>
            </div>
            <div v-else>
                <button class="btn btn--secondary wk-pagination__pageb" v-for="n in getPostPagesSmArray" :key="n" @click="onPageChange(n)">
                    {{n}}
                </button>
            </div>

            <button class="btn btn--secondary wk-pagination__pageb" v-if="getPage < getMaxPage" @click="onPageChange(getMaxPage)">
                {{getMaxPage}}
            </button>
            <button class="btn btn--secondary wk-pagination__pageb wk-pagination__pageb--rightend"  v-if="getPage < getMaxPage" @click="onPageChange(getPage + 1)" title="Następna strona">
                <fa-icon icon="caret-right" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getPage(){
            return parseInt(this.page);
        },
        getMaxPage(){
            return parseInt(this.pageMax);
        },
        getPrePagesSmArray(){
            const arr = [];
            for(let i = 2; i < this.getPage; i++){
                arr.push(i);
            }
            return arr;
        },
        getPostPagesSmArray(){
            const arr = [];
            for(let i = this.getPage + 1; i < this.getMaxPage; i++){
                arr.push(i);
            }
            return arr;
        }
    },
    methods: {
        onPageChange(n){
            this.$emit('pageChange', n);
        }
    },
    
    props: {
        page: {
            type: [Number, String],
            required: true
        },
        pageMax: {
            type: [Number, String],
            required: true
        }
    }
}
</script>