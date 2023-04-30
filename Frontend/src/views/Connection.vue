<template>
    <div class="connection">
      <h1>Site de partages photos</h1>
      <p>Formulaire d'inscription</p>
      <form @submit.prevent="submitForm">

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>

        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
    export default {
      data() {
        return {
          email : '',
          password: ''
        };
      },
      methods: {
        submitForm() {
          // send a POST request to the server with the form data
          axios.post('http://localhost:3000/api/auth/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            // handle the response from the server
            console.log(response.data);
          })
          .catch(error => {
            // handle any errors that occur
            console.error(error);
          });
        }
      }
    };
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>