<template>
  <div>
    <h1>Profil utilisateur</h1>
    <div v-if="user">
      <v-card>
        <v-card-title>
          Informations personnelles
        </v-card-title>
        <v-card-text>
          <v-form
          ref="form"
          v-model="form"
          lazy-validation
          @submit.prevent="updateUser"
          >
            <v-row>
              <v-col cols="6">
                <v-text-field
                  id="firstname"
                  v-model="user.firstname"
                  label="Prénom"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  id="lastname"
                  v-model="user.lastname"
                  label="Nom"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  id="birthdate"
                  v-model="user.birthdate"
                  type="date"
                  label="Date de naissance"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-select
                  id="sexe"
                  v-model="user.sexe"
                  label="Sexe"
                  :items="['Homme', 'Femme', 'Autre']"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  id="description"
                  v-model="user.description"
                  label="Description personnelle"
                  auto-grow
                  :rows="2"
                ></v-textarea>
              </v-col>

              <v-col cols="6">
                <vue-google-autocomplete
                  id="location"
                  ref="location"
                  v-model="user.location"
                  label="Localisation"
                  types="(cities)"
                  placeholder="Saisissez votre localisation"
                  @:placechanged="autocompleteLocation"
                ></vue-google-autocomplete>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  id="favoriteEquipment"
                  v-model="user.favoriteEquipment"
                  label="Matériel favori"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  id="xpPro"
                  v-model="user.xpPro"
                  label="Expérience professionnelle"
                  auto-grow
                  :rows="2"
                ></v-textarea>
              </v-col>

            </v-row>

            <v-card-actions>
              <v-btn
                type="submit"
                color="primary"
              >
                Compléter le profil
              </v-btn>
            </v-card-actions>

          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import VueGoogleAutocomplete from '../../node_modules/vue-google-autocomplete/src/VueGoogleAutocomplete.vue';

export default {
components: {
  VueGoogleAutocomplete,
},
data() {
  return {
    user: {
      userId: null,
      firstname: '',
      lastname: '',
      birthdate: null,
      sexe: '',
      description: '',
      location: '',
      favoriteEquipment: '',
      xpPro: ''
    },
    loading: true,
    rules: {
      required: value => !!value || 'Field is required',
    },
  };
},
mounted() {
  this.getUser();
  this.$refs.location.focus();
},
methods: {
  getUser() {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/user/getUserId', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.userId = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  updateUser() {
      axios.put('http://localhost:3000/api/user/updateUser', {
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
        this.$router.push('/profil');
      })
      .catch(error => {
        console.log(error);
      });
  },

  /**
      * When the location found
      * @param {Object} addressData Data of the found location
      */
  autocompleteLocation(addressData) {
    this.user.location = addressData.locality;
  }
}
};
</script>

<style lang="scss" scoped>

#location {
width: 100%;
height: 72%;
background-color: #F6F6F6;
border-bottom: solid 1px lightgray;
border-bottom-color: #A5A5A5;
border-radius: 5px 5px 0 0;
}

#location:hover {
background-color: #e9e9e9;
border-bottom: solid 1px lightgray;
border-bottom-color: black;
}

#location:placeholder-shown {
padding-left: 12px;
font-size: medium;
}

</style>