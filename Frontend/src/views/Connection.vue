<template>
  <div class="connection">
    <v-sheet class="bg-deep-green pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="submitForm"
        >
          <v-text-field
            v-model="email"
            type="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            size="large"
            label="Email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            size="large"
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>

          <br>

          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="hsla(160, 100%, 37%, 1)"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>

        </v-form>
      </v-card>
    </v-sheet>
    <v-btn
      to="/inscription"
      block
      color="hsla(160, 100%, 37%, 1)"
      size="large"
      variant="elevated"
      >
        Register
      </v-btn>
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
          axios.post('https://photo-pro-backend.vercel.app/api/user/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            window.location.replace('https://photo-pro.vercel.app/profil');
          })
          .catch(error => {
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