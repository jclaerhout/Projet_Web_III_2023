<template>
  <div>
    <h1>Ajout de photo</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <input id="input" type="file" ref="fileInput" @change="addPhoto">
      <button @click="selectPhoto">Ajouter une Image</button>
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
            this.loading = false;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addPhoto() {
      axios.put('http://localhost:3000/api/auth/addPhoto', {
        user: this.user,
        link: this.link,
        description: this.description
      })
          .then(response => {
            console.log(response.data);
            this.$router.push('/profil');
          })
          .catch(error => {
            console.log(error);
          });
    },
    selectPhoto(){

    }
  }
};
</script>