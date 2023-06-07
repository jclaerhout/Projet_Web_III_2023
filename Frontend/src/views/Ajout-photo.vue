<template>
  <div>
    <h1>Ajout de photo</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <form>
        <input id="input" type="file" @change="onFileSelected" ref="fileInput" accept="image/*">
        <input type="submit" @click="addPhoto(); uploadPhoto()">
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
      link: '',
      description: '',
      loading: true,
      selectedFile: null,
    };
  },
  mounted() {
    this.getUser();
    this.getLink();
  },
  methods: {
    getUser() {
      const token = localStorage.getItem('token');
      axios
          .get('http://localhost:3000/api/auth/getUserId', {
            headers: {authorization: `Bearer ${token}`},
          })
          .then((response) => {
            this.userId = response.data;
            this.loading = false;
            console.log(this.userId)
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addPhoto() {
      this.img = document.getElementById("input").files[0].name
      console.log(this.img);
      axios.put('http://localhost:3000/api/auth/addPhoto', {
        userId: this.userId.userId,
        link: this.img,
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
    onFileSelected(event) {
      console.log(this.selectedFile = event.target.files[0]);
    },

    uploadPhoto() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.post('http://localhost:3000/api/auth/uploadPhoto', fd)
          .then(res => {
            console.log(res)
          })
    },
    getLink() {
      axios
          .post('http://localhost:3000/api/auth/getLink', {
              userId: this.userId,
          }
          .then(response => {
            const photoNames = response.data;
            photoNames.forEach(photoName => {
              const photo = document.createElement('img');
              photo.src = `../photo/${photoName}`;
              document.body.appendChild(photo);
            });
          })
          .catch(error => {
            console.error(error);
          }))
    }
}}
</script>