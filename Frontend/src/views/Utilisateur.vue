<template v-if="user">
  <div class="row">
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-column align-items-center text-center">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
          <div class="mt-3">
            <h4 v-if="user.name || user.firstname" style="font-size:x-large;">{{ user.name }} {{ user.firstname }}</h4>
            <h4 v-else style="font-size:x-large;">Utilisateur{{ user.id }}</h4>
            <p v-if="user.email" style="color:rgb(7, 144, 241);">{{ user.email }}</p>
            <p v-else style="color:rgb(7, 144, 241);">Pas d'email renseigné</p>
            <p v-if="user.location" style="">{{ user.location }}</p>
            <p v-else>Pas de lieu renseigné</p>
            <v-btn color="green">Follow</v-btn>
            <v-btn color="green">Message</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" :alt="user.link" height="100%" width="75vh" cover></v-img>
      <!--<v-img :src="user.link" :alt="user.link" height="100%" width="75vh" cover></v-img>-->
      <div class="card-body">
        <div class="d-flex flex-column align-items-center text-center">
          <h4 style="font-size:x-large;">Dernière photo publiée</h4>
          <p style="">{{ user.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    data() {
        return {
            user: null,
        };
    },
    //Call the function fetchUser when the parameter in the this.$router.push from the searchbar change
    watch: {
        '$route.params.userId'() {
            this.fetchUser();
        },
    },
    //Call the function fetchUser when the page is created
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            const userId = this.$route.params.userId;
            await axios.get(`http://localhost:3000/api/user`, {
                params: {
                    userId: userId,
                },
                })
                .then(response => {
                    this.user = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};

</script>
<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}
</style>