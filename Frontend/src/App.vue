<template>
  <div id="app">
    <v-app>
      <v-app-bar color="hsla(160, 100%, 37%, 1)" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <router-link to="/"><v-img src="/appareil-photo.png" height="64" width="64" max-height="64"></v-img></router-link>
        <v-spacer></v-spacer>
        <v-text-field placeholder="Recherche" hide-details></v-text-field>
        <router-link to="/connection"><v-btn color="white" text>Connexion</v-btn></router-link>
      </v-app-bar>
    </v-app>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
