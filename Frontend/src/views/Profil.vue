<template>
  <div class="profil">
    <div class="profil-infos">
      <v-sheet
      elevation="12"
      max-width="1000"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
    >
      <h1>Mon profil</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <v-row>
          <v-col cols="12">
            <v-card class="infoCard">
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].name"
                      label="Nom"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].firstname"
                      label="Prénom"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].birthdate"
                      label="Date de naissance"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].email"
                      label="Email"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].sexe"
                      label="Sexe"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].location"
                      label="Localisation"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].favoriteEquipment"
                      label="Equipement favori"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="user[0].xpPro"
                      label="Experience professionnelle"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
    </v-sheet>
    </div>
    <div class="profil-gallery">
      <h1>Mes Galleries Photos</h1>
      <div class="dialog">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Créer une gallerie de photos</span>
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
        <v-btn id="button" color="hsla(160, 100%, 37%, 1)" @click="openDialog">+ Gallerie</v-btn>
      </div>
      <!-- Section pour afficher les galleries de photos -->
      <div class="list-gallery">
        <v-chip v-for="gallery in galleries" :key="gallery.id" @click="filterPhotosByGallery(gallery)">
          {{ gallery.name }}
        </v-chip>
      </div>
      <!-- Section pour afficher les photos filtrées -->
      <div class="filtered-photos">
        <v-card v-for="photo in filteredPhotos" :key="photo.id">
          <!-- Affichage de la photo -->
        </v-card>
      </div>
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
      description: '',
      galleries: [],
      filteredPhotos: []
    }
  },

  created() {
    this.fetchUser();
  },

  methods: {
    // Méthode pour récupérer l'utilisateur connecté depuis le backend
    fetchUser() {
      const token = localStorage.getItem('token');

      axios
        .get('http://localhost:3000/api/page/profil', {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.user = response.data;
          if (this.user[0].birthdate === null) {
            this.user[0].birthdate = '';
          } else {
            const dateObj = new Date(this.user[0].birthdate);
            const formatedDate = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
            this.user[0].birthdate = formatedDate;
          }
          this.loading = false;

          // Récupération des galleries de photos de l'utilisateur
          this.fetchGalleries(this.user[0].id);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // Méthode pour ouvrir le dialog
    openDialog() {
      this.dialog = true
    },

    // Méthode pour fermer le dialog
    closeDialog() {
      this.dialog = false
      this.name = ''
      this.description = ''
    },

    // Méthode pour ajouter une gallerie a la db
    createGallery() {
      axios.post('http://localhost:3000/api/galleries', {
        name: this.name,
        description: this.description,
        id_user: this.user[0].id
      })
      .then((response) => {
        console.log(response)
        const newGallery = response.data
        this.galleries.push(newGallery)
        this.closeDialog()

        // Récupération des galeries mises à jour de l'utilisateur
        this.fetchGalleries(this.user[0].id);
      })
      .catch (error => {
        console.error(error)
      });
    },

    // Méthode pour récupérer les galeries de l'utilisateur connecté depuis le backend
    fetchGalleries(userId) {
      const token = localStorage.getItem('token');
      axios
        .get(`http://localhost:3000/api/galleries/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.galleries = response.data;
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
  display: flex;
  flex-direction: column;
  margin-top: 4rem;

  &-infos {
    padding: 1rem 2rem;
    width: 600px;
  }

  &-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;

    .dialog {
      #button {
        margin-top: 1.5rem;
      }
    }

    .list-gallery {
      margin-top: 2rem;
    }
  }
}
</style>