<template>
    <div>
      <v-sheet
        elevation="12"
        max-width="1000"
        rounded="lg"
        width="100%"
        class="pa-4 text-center mx-auto"
      >
        <h1>Your Profile</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <p>Nom: {{ user.name }}</p>
          <p>Prénom: {{ user.firstname }}</p>
          <p>Date de naissance: {{ user.birthdate }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Sexe: {{ user.sexe }}</p>
          <p>Localisation: {{ user.location }}</p>
          <p>Equipement favori: {{ user.favoriteEquipment }}</p>
          <p>Experience professionnelle: {{ user.xpPro }}</p>
        </div>
      </v-sheet>
      <br><br>
      <v-btn
          block
          to="/completion-profil"
          color="hsla(160, 100%, 37%, 1)"
          size="large"
          type="submit"
          variant="elevated"
          >
            Compléter mon profil
        </v-btn>
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