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
      </div>
    </v-sheet>
    <br /><br />
    <v-btn
      block
      to="/completion-profil"
      color="primary"
      size="large"
      type="submit"
      variant="elevated"
    >
      Compléter mon profil
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';

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
      .get('https://photo-pro-backend.vercel.app/api/page/profil', {
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
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>

.infoCard {
  width: 600px;
}

</style>