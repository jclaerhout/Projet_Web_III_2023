<template>
  <v-sheet rounded class="pa-12" color="hsla(160, 100%, 37%, 1)">
    <v-card class="mx-auto px-6 py-8" max-width="344" title="User Registration">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          color="primary"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          color="primary"
          label="Password"
          :readonly="loading"
          :rules="[required]"
          clearable
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn 
          color="success"
          :disabled="!form"
          :loading="loading"
          block
          size="large"
          type="submit"
          variant="elevated"
          >
            Complete Registration

            <v-icon icon="mdi-chevron-right" end></v-icon>
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
      form: false,
      email: this.email,
      password: this.password,
      loading: false,
    };
  },
  methods: {
    onSubmit() {      
      if (!this.form) return
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)

      // send a POST request to the server with the form data
      axios.post('http://localhost:3000/api/auth/signup', {
        name: undefined,
        firstname: undefined,
        email: this.email,
        password: this.password,
        location: undefined,
        job: undefined
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