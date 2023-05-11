<template>
  <div>
    <h1>Your Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <v-btn
          block
          to="/Ajout-photo"
          size="large"
          type="submit"
          variant="elevated"
      >
        Cliquez pour ajouter une photo
      </v-btn>
    </div>
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