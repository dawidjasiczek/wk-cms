  <template>
    <div class="login">
        <div class="login__container">
            <div class="login__content">
                <div class="login__logo">
                    <img :src="logo" alt="">
                </div>
                <p class="login__title">{{appName}}</p>
                <p class="login__subtitle">
                    <span v-if="lang=='pl'">Panel Administracyjny</span>
                    <span v-else>Administration Panel</span>
                </p>
   
                <WkInput class="login__input" 
                :required="true"
                label="Login"
                :msg="(lang=='pl')? 'Proszę podać login':'Login is required'"
                type="text"
                ref="login"
                name="login"
                v-model="login"
                />
                <WkInput class="login__input"
                :required="true"
                :msg="(lang=='pl')? 'Proszę podać hasło':'Password is required'"
                :label="(lang=='pl')? 'Hasło':'Password'"
                type="password"
                ref="password" 
                name="password"
                v-model="password"
                />
                <WkButton color="secondary" classes="login__btn"  @click="loginIn" :loading="loading">
                    <template>
                        <span v-if="lang=='pl'">Zaloguj</span>
                    <span v-else>Login</span>
                    </template>
                    </WkButton>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>

<script>
export default {
    data(){
        return{
            login: "",
            password: "",

            loading: false
        }
    },
    props: {
        logo:{
            type: String,
            default: "logo",
        },
        appName: {
            type: String,
            default: "Nazwa Aplikacji"
        },
        lang: {
            type: String,
            default: "pl",
        },
        loginRoute:{
            type: String,
            default: '/auth/login'
        },
        afterLoginRoute:{
            type: String,
            default: '/admin'
        }
    },
    methods: {
        checkInputs(){
            const p = this.$refs.password.validate();
            const l = this.$refs.login.validate();
            if(p && l) return true;
            return false;
        },
        async loginIn(){
            if(this.loading) {
                return;
            }
            if(!this.checkInputs()) {
                return;
            }
            this.loading = true;
            try{
                const r = await this.$axios.$post(this.loginRoute, {
                    login: this.login,
                    password: this.password
                });
                if(r && r.success == true) {
                    this.$store.commit('auth/setUser', {username: r.data.user.username});
                    this.$store.commit('auth/setAuthData', {token: r.data.token, expDate: r.data.token_exp_date, userRole: r.data.user.role});
                    this.$router.push("/admin");
                }
            } catch(e) {
                console.error(e)
                this.loading = false;
            }
            
        },

        onEnter(ev){
            if(ev.keyCode && ev.keyCode === 13){
                this.loginIn();
            }
        }
    },

    mounted(){
        window.addEventListener('keypress', this.onEnter);
    },
    beforeDestroy(){
        window.removeEventListener('keypress', this.onEnter);
    }
}
</script>