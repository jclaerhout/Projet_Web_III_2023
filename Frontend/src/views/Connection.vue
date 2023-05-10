<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="connection">
    <v-sheet class="bg-deep-green pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="submitForm"
        >
          <v-text-field
            type="email"
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            size="large"
            label="Email"
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
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
            color="success"
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
      color="success"
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
          axios.post('http://localhost:3000/api/auth/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            this.$router.push('/profil');
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