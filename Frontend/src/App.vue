<template>
  <div id="app">
    <router-link to="/">Accueil</router-link>
    <router-link to="/inscription">Inscription</router-link>
    <router-link to="/connection">Se connecter</router-link>
    <button @click="logout">Se déconnecter</button>
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
