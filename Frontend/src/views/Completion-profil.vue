<template>
    <div>
      <h1>Profil utilisateur</h1>
      <div v-if="user">
        <v-card>
          <v-card-title>
            Informations personnelles
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.firstname"
                    label="Prénom"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.lastname"
                    label="Nom"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    type="date"
                    v-model="user.birthdate"
                    label="Date de naissance"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.sexe"
                    label="Sexe"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="user.description"
                    label="Description personnelle"
                    auto-grow
                    :rows="2"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.location"
                    label="Localisation"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.favoriteEquipment"
                    label="Matériel favori"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="user.xpPro"
                    label="Expérience professionnelle"
                    auto-grow
                    :rows="2"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/profil" color="primary" @click="updateUser">
              Compléter le profil
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        userId: null,
        firstname: '',
        lastname: '',
        birthdate: '',
        sexe: '',
        description: '',
        location: '',
        favoriteEquipment: '',
        xpPro: ''
      },
      loading: true,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('token');
      axios
        .get('http://localhost:3000/api/auth/getUserId', {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.userId = response.data;
          console.log(this.userId);
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateUser() {
      axios.put('http://localhost:3000/api/auth/updateUser', {
          userId: this.userId,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          birthdate: this.user.birthdate,
          sexe: this.user.sexe,
          description: this.user.description,
          location: this.user.location,
          favoriteEquipment: this.user.favoriteEquipment,
          xpPro: this.user.xpPro
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    required(value) {
      return !!value || 'Field is required';
    },
  }
};
</script>

<style lang="scss" scoped>

</style>