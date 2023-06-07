<template>
  <div class="profil">
    <v-sheet
      elevation="12"
      max-width="1000"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto infos"
    >
      <h1 class="text">Mon Profil</h1>
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
    <h1>
      Ma Gallerie Photos
    </h1>
    <div class="gallerie-category">
      <v-btn color="hsla(160, 100%, 37%, 1)" @click="openDialog">+ Catégorie</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Créer une gallerie de photo</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="name" label="Nom de la gallerie"></v-text-field>
            <v-text-field v-model="description" label="Description de la gallerie"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="hsla(160, 100%, 37%, 1)" text @click="closeDialog">Annuler</v-btn>
            <v-btn color="hsla(160, 100%, 37%, 1)" text @click="createGallery">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      user: null,
      loading: true,
      dialog: false,
      name: '',
      description: ''
    }
  },

  created() {
    const token = localStorage.getItem('token')

    axios
    .get('http://localhost:3000/api/page/profil', {
      headers: { authorization: `Bearer ${token}` }
    })
    .then((response) => {
      this.user = response.data;
      this.loading = false
    })
    .catch((error) => {
      console.error(error)
    })
  },

  methods: {
    // Méthode pour ouvrir le dialog
    openDialog() {
      this.dialog = true
    },

    // Méthode pour fermer le dialog
    closeDialog() {
      this.dialog = false
    },

    // Méthode pour créer une galerie
    createGallery() {
      const token = localStorage.getItem('token');

      axios
        .post('http://localhost:3000/api/galleries', {
          name: this.name,
          description: this.description
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          console.log(response.data);
          this.closeDialog();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

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

.gallerie {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  margin: 6rem 0;

  h1 {
    text-align: left;
  }

  &-category {
    display: flex;
    margin-top: 1.5rem;
    flex-direction: row;
    justify-content: space-between;

    .v-card-title {
      padding: 1rem;
    }
  }
}
</style>