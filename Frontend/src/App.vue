<template>
  <div id="app">
    <v-app>
      <v-app-bar color="hsla(160, 100%, 37%, 1)" dark class="nav">
        <router-link to="/">
          <v-img id="logo" src="/appareil-photo.png" height="64" width="64" max-height="64"></v-img>
        </router-link>
        <v-spacer></v-spacer>
        <v-text-field placeholder="Recherche" hide-details></v-text-field>
        <router-link to="/connection"><v-btn color="white" text>Se connecter</v-btn></router-link>
        <v-btn color="white" text @click="logout">Se deconnecter</v-btn>
        <v-btn color="white" text to="/profil">Profil</v-btn>
      </v-app-bar>
    </v-app>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/connection');
    }
  }
};
</script>


<style lang="scss" scoped>
.nav {
  padding: 0.5rem 0 0.5rem;

  #logo {
  margin: 0 2rem;
}
}
</style>
