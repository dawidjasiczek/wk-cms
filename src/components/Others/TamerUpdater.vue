<template>
    <div>
        <WkModal confirmButtonText="Aktualizuj"
        cancelButtonText="Nie teraz"
        :show="updateModal"

        @cancel="() => (!loading ? updateModal = false : '')"
        @confirm="onUpdateConfirm"
        confirmButtonType="success"
        :loading="loading">

        <template>
            <h2 class="layout__h2">Dostępna aktualizacja</h2>
            Dostępna jest aktualizacja oprogramowania WK-Tamer, w oparciu o które pracuje Twoja aplikacja. Zalecamy regularne aktualizacje w celu zapewnienia maksimum bezpieczeństwa i wydajności swojej aplikacji. Wersja WK-Tamer, z której korzystasz: <b>{{$store.state._v}}</b>, aktualna wersja: <b>{{newV}}</b>. Poniżej znajduje się lista zmian:

            <div>
            <div v-for="entry in changelog" :key="entry.version">
                <h3 style="margin: 30px 0 10px">{{entry.version}}</h3>
                <ul>
                <li v-for="(t, index) in entry.changelog" :key="'clog_' + entry.version + '_' + index">
                    {{t}}
                </li>
                </ul>
            </div>
            </div>
        </template>
    </WkModal>
    </div>
</template>
<script>
export default {
  data(){
    return{
      checkedForUpdates: false,
      loading: false,
      updateModal: false,
      newV: "",
      changelog: []
    }
  },
  methods: {
    async checkForUpdates(){
      if(this.checkedForUpdates) return;
        try {
            let r = await this.$axios.$get("/_system/checkForUpdates");
            if(r && r.success == true){
                if(r.data && r.data !== false){
                
                this.newV = r.data.new_version;
                this.changelog = r.data.changelog;
                this.updateModal = true;
                }
            }
        } catch(e) {}
      
      
      this.checkedForUpdates = true;
    },
    async onUpdateConfirm(){
      if(this.loading) return;
      this.loading = true;
      
      let r = await this.$axios.$post("/_system/update");
      if(r && r.success == true){
        this.$alert({type: 'success', msg: "Aktualizacja przebiegła pomyślnie. Dziękujemy za poświęcony czas, rozwijamy się dla Ciebie."});
        this.$store.commit('_v', this.newV);
      }
      else{
        this.$alert({type: 'error', msg: "Aktualizacja nie powiodła się. Prawdopodobnie winna jest błędna konfiguracja serwera. Skontaktuj się z Administratorami Twojej aplikacji."});
      }
      this.loading = false;
      this.updateModal = false;
    }
  },
  created(){
    this.checkForUpdates();
  }
  // beforeRouteLeave(to, from, next){
  //   if(this.lol != ""){
  //     const an = window.confirm('Czy na pewno chcesz opuścić tą stronę? Niezapisane zmiany zostaną utracone');
  //     if(an){
  //       next();
  //     }else{
  //       next(false);
  //     }
  //   }else{
  //     next();
  //   }
  // }
}
</script>