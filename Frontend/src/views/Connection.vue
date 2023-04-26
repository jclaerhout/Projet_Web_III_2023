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
          users: [],
        };
      },
      mounted() {
        axios.get('http://localhost:3000/api/auth/login')
          .then(response => {
           // handle success
            console.log(response.data)
         })
          .catch(error => {
           // handle error
            console.log(error)
          })
      }
    };
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>