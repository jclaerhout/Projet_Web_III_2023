<template>
  <v-sheet rounded class="pa-12" color="hsla(160, 100%, 37%, 1)">
    <v-card class="mx-auto px-6 py-8" max-width="344" title="User Registration">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          id="email"
          v-model="email"
          type="email"
          label="Email"
          variant="underlined"
          placeholder="Enter your email"
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          id="password"
          v-model="password"
          type="password"
          label="Password"
          variant="underlined"
          placeholder="Enter your password"
          :rules="[required]"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
          block
          color="hsla(160, 100%, 37%, 1)"
          size="large"
          type="submit"
          variant="elevated"
          >
            Complete Registration
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: this.email,
      password: this.password,
    };
  },
  methods: {
    onSubmit() {
      // send a POST request to the server with the form data
      axios.post('http://localhost:3000/api/auth/signup', {
        name: '',
        firstname: '',
        email: this.email,
        password: this.password,
        location: '',
        job: '',
      })
      .then(response => {
        // handle the response from the server
        console.log(response.data);
      })
      .catch(error => {
        // handle any errors that occur
        console.error(error);
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