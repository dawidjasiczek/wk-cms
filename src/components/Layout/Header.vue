<template>
    <div class="wk-header">
        <div class="wk-header__wrapper">
            <div class="wk-header__content">
                <div class="wk-header__left">
                    <button class="wk-header__stoggle btn btn--icon p-0" @click="$emit('sidebar-collapse', !sidebarCollapsed)">
                        <fa-icon icon="bars" style="font-size: 22px" v-if="sidebarCollapsed"/>
                        <fa-icon icon="stream" v-else/>
                    </button>
                    <router-link class="wk-header__logo" :to="'/'" tag="a">
                        <img :src="logo" alt="Logo">
                    </router-link>
                </div>

                <div class="wk-header__right">
                    <div class="wk-header__avatar">
                        <div class="wk-header__avatar-letters">
                            {{short}}
                        </div>
                       
                    </div>
                    <div class="wk-header__username"> {{name}} </div>
                    <button class="wk-header__logout btn btn--danger btn--sm" @click="logout" ><fa-icon icon="sign-out-alt"/><span>WYLOGUJ</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    props: {
        sidebarCollapsed: {
            type: Boolean,
            default: false
        },
        logo: {
            type: String,
            default:  ""
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push("/admin/login");
        }
    },
    computed:{
        short(){
            if(this.$store.getters['auth/isLoggedIn'] == true){
                const n = this.$store.getters['auth/userName'].split(' ');
                if(n.length > 1){
                    return n[0][0].toUpperCase() + n[1][0].toUpperCase();
                }
                else return n[0][0].toUpperCase() + n[0][1].toUpperCase();
            }
        },
        name() {
            if(this.$store.getters['auth/isLoggedIn'] == true) {
                return this.$store.getters['auth/userName'];
            } else {
                return '';
            }  
        }
    }
}
</script>