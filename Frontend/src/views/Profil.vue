<template>
  <div class="profil">
    <v-sheet
      elevation="12"
      max-width="1000"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto infos"
    >
      <h1 class="text">Votre Profil</h1>
      <div v-if="loading">Loading...</div>
      <div v-else class="text">
        <p>{{ user.name }} {{ user.firstname }}</p>
        <p>Date de naissance: {{ user.birthdate }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Sexe: {{ user.sexe }}</p>
        <p>Localisation: {{ user.location }}</p>
        <p>Equipement favori: {{ user.favoriteEquipment }}</p>
        <p>Experience professionnelle: {{ user.xpPro }}</p>
      </div>
      <v-btn
      id="button"
      to="/completion-profil"
      color="hsla(160, 100%, 37%, 1)"
      size="large"
      type="submit"
      variant="elevated"
      >
        Compléter mon profil
      </v-btn>
    </v-sheet>
    <div class="cover">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="100%" width="600" cover></v-img>
    </div>
  </div>
  <div class="gallerie">
    Gallerie Photos
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      user: null,
      loading: true,
    };
  },
  created() {
      const token = localStorage.getItem('token');

      axios
    .get('http://localhost:3000/api/page/profil', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      this.user = response.data;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
    });
  }
};

</script>

<style lang="scss" scoped>
.profil {
  display: grid;
  grid-template-columns: 1fr 2fr;

  .infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1rem 2rem;

    .text {
      text-align: left;
    }

    #button {
      margin-top: 1rem;
    }
  }
}
</style>