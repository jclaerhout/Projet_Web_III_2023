<template>
  <div class="accueil">
    <section class="accueil-landing">
      <div class="fullscreen-img">
        <img src="/img/camera.png" alt="Image d'une caméra">
      </div>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <h1 class="title">Bienvenue sur la plateforme Photo Pro</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn color="#00bd7e" class="mt-4" size="large" @click="scrollToContent">
              Découvrir
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="accueil-grid">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h2 class="subtitle mb-4">
              Découvrez des photos incroyables
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="mt-4" v-for="(photo, index) in photos" :key="index">
              <v-img :src="photo.urls.regular" height="300px" />
              <v-card-title>{{ photo.alt_description }}</v-card-title>
              <v-card-actions>
                <v-btn color="primary">S'inscrire</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        photos: [],
      };
    },

    mounted() {
      axios.get('http://localhost:3000/api/page')
        .then(response => {
         // handle success
          console.log(response.data)
       })
        .catch(error => {
         // handle error
          console.log(error)
        })

      this.getPhotosFromUnsplash()
    },

    methods: {
      // Permet deslider jusque la 2e section de la page accueil
      scrollToContent () {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      },

      // Récupère des photos aléatoires depuis l'api unpslash
      async getPhotosFromUnsplash() {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: 'U3bJEMBp-PUbFXL5vp3J_65VQFn0Aqi3TZqzy7jzWkk',
        },
        params: {
          query: 'professional photography',
        },
      });
      this.photos = response.data
      },
    }
  }

</script>

<style lang="scss" scoped>
.accueil-landing {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .fullscreen-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    background-color: rgba(182, 182, 184, 0.8);
    border-radius: 2rem;
    border: 2px solid black;
    padding: 2rem 1rem;
  }
}
</style>