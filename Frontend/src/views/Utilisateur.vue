<template>
    <div>
        <h1>Utilisateur : </h1>
        <template v-if="user">
        <p>Nom: {{ user.name }}</p>
        <p>Prénom: {{ user.firstname }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Emplacement : {{ user.location }}</p>
        </template>
        <template v-else>
        <p>Loading user data...</p>
        </template>
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
    //Call the function fetchUser when the page is created
    created() {
        this.fetchUser();
    },
    //Call the function fetchUser when the parameter in the this.$router.push from the searchbar change
    watch: {
        '$route.params.userId'(newValue, oldValue) {
            this.fetchUser();
        },
    },
    methods: {
        async fetchUser() {
            const userId = this.$route.params.userId;
            const response = await axios.get(`http://localhost:3000/api/user`, {
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