<template>
    <div>
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
      <h1>Your Profile</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <p>Name: {{ user.name }}</p>
        <p>Fistname: {{ user.firstname }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Location: {{ user.location }}</p>
        <p>Job: {{ user.job }}</p>
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