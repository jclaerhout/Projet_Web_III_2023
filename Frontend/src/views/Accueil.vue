<template>
  <div class="accueil">
    <h1>Site de partages photos</h1>
    <p>Description de mon site</p>
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
      axios.get('http://localhost:3000/api/page')
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