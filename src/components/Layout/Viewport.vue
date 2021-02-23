<template>
  <div>
    <WkHeader 
      @sidebar-collapse="onSidebarCollapse" 
      :sidebar-collapsed="sidebarCollapsed"
      :logo="logo"
      ref="wk-header"
    />
    <WkAlert />

    <div class="dashboard-leveler"
      :style="{
        'height': headerHeight + 'px'
      }"
    ></div>

    <div 
      class="wk-menubar"
      :class="{
        'wk-menubar--collapsed': sidebarCollapsed,
        'wk-menubar--nowrap': sidebarNowrap
      }"
      :style="{
        'height': (vh * 100) - headerHeight + 'px',
        'top': headerHeight + 'px'
      }"
    >
      <div class="wk-menubar__wrapper">
        <div class="wk-menubar__content">
          
          <slot name="menu"/>

        </div>
      </div>
      <div class="wk-menubar__claim" :class="{
        'collapsed': sidebarCollapsed
        }">
        <p class="wk-menubar__claim-tamer" >
          WK-CMS powered by WK-TAMER {{tamerVersion}}</p>
        <div class="wk-menubar__claim-wk" >
          <span >&copy;</span>
          <a href="wirtuozikodu.pl" target="_blank">
            <img src="https://wirtuozikodu.pl/static/imgs/logo.svg">
          </a>
          <a href="wirtuozikodu.pl"   target="_blank"><span>WirtuoziKodu</span></a>
        </div>
      </div>
    </div>
    <div 
      class="wk-viewport"
      :class="{'wk-viewport--stretched': sidebarCollapsed == false}"
    >
      <div class="wk-viewport__content">
        <slot name="content" />
      </div>

    </div>
    <div class="offline-alert" v-if="offline">
      <div class="offline-alert__content">
        <div class="offline-alert__text">Aplikacja utraciła połączenie z internetem.<br> Dalsza praca będzie będzie możliwa po jego odzyskaniu</div>
        <div class="offline-alert__spinner">
          <WkButtonSpinner :show="true" color="#D73227"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  {EventBus} from "../EventBus"
export default {
  
  data(){
    return {
      sidebarCollapsed: false,
      sidebarNowrap: false,
      headerHeight: 1,
      vh: 1,
      offline: false,
      loading: true
    }
  },  computed: {
    tamerVersion(){
      return this.$store.state._v
    },
    isAdmin(){
      return this.$store.getters['auth/isAdmin'];
    }
  },

    props:{
        devMode:{
            type: Boolean,
            default: false,
        },
        logo:{
            type: String,
            default: ""
        }
    },
  watch: {
    sidebarCollapsed(v){
      if(v === true) this.sidebarNowrap = true;
      else{
        setTimeout(_ => this.sidebarNowrap = false, 400);
      }
    }
  },
  created(){
    window.addEventListener('offline', () => this.offline = true);
    window.addEventListener('online', () => this.verifyConnection(false));
    this.verifyConnection(true)
  },
  methods: {
    async verifyConnection(noAlert = false){
      if(this.devMode === true){
          this.offline = false;
          return;
      }
      try{
        let r = await this.$axios.$get('/test');
        console.log("hello")
        this.offline = false;
        if(r.tamer_version) this.$store.commit('_v', r.tamer_version);
        if(!noAlert) this.$alert({type: 'success', msg: "Aplikacja odzyskała połączenie z Internetem"});
      }
      catch(err){
        console.log('catch')
        if(this.offline == false) this.offline = true;
        setTimeout(this.verifyConnection, 5000);
      }
    },
    getHeaderHeight(){
      if(!this.$refs['wk-header']){
        setTimeout(this.getHeaderHeight, 1000);
      }
      else{
        this.headerHeight = this.$refs['wk-header'].$el.offsetHeight;
      }
    },
    handleVH(){
      this.vh = window.innerHeight / 100;
    },

    onSidebarCollapse(state){
      this.sidebarCollapsed = state;
      if(state === true){
        EventBus.$emit('biurko-animated-collapse-open', 'lol');
      }
    },

    onOptionsGroupToggle(state){
      
      if(state === true && this.sidebarCollapsed === true) this.onSidebarCollapse(false);
    }
  },

  async mounted(){

    //pobranie wysokości menu i okna + event on resize
    this.getHeaderHeight();
    this.handleVH();
    window.addEventListener('resize', this.getHeaderHeight);
    window.addEventListener('resize', this.handleVH);

    // if(this.$store.getters['auth/isLoggedIn']){
    //   this.$axios.setHeader('Authorization', 'Bearer ' + this.$store.state.auth.user.token);
    // }

    EventBus.$on('menubar-options-group-toggle', this.onOptionsGroupToggle)
    setTimeout(_ => {
      this.loading = false;
    }, 1000);
  },

  beforeDestroy(){
    window.removeEventListener('resize', this.getHeaderHeight);
    window.removeEventListener('resize', this.handleVH);
  },

  middleware: 'isStaff',

  head(){
    return {
      bodyAttrs: {
        class: 'bg--100'
      }
    }
  }
}
</script>