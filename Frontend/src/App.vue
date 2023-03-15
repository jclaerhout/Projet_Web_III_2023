<template>
  <div id="app">
    <router-link to="/">Accueil</router-link>
    <router-link to="/inscription">Inscription</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
