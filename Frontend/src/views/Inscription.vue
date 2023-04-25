<template>
  <div class="inscription">
    <h1>Page d'inscription</h1>
    <p>Formulaire d'inscription</p>
    <form @submit.prevent="submitForm">
      <label for="firstname">Prénom:</label>
      <input type="text" id="firstname" v-model="firstname" required>

      <label for="lastname">Nom de famille:</label>
      <input type="text" id="lastname" v-model="lastname" required>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>

      <label for="location">Location:</label>
      <input type="text" id="location" v-model="location" required>

      <label for="job">Job:</label>
      <input type="text" id="job" v-model="job" required>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      location: '',
      job: ''
    };
  },
  methods: {
    submitForm() {
      // send a POST request to the server with the form data
      axios.post('http://localhost:3000/api/auth/signup', {
        name: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
        location: this.location,
        job: this.job
      })
      .then(response => {
        // handle the response from the server
        console.log(response.data);
      })
      .catch(error => {
        // handle any errors that occur
        console.error(error);
      });
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>