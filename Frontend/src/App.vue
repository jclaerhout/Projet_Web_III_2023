<template>
  <div id="app">
    <div class="flex-container">
      <v-app id="navbar">
        <v-app-bar color="hsla(160, 100%, 37%, 1)" dark>
          <router-link to="/">
            <v-img src="/appareil-photo.png" height="64" width="64" max-height="64"></v-img>
          </router-link>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchQuery"
            placeholder="Recherche"
            @input="handleSearch"
            @focus="handleSearchFocus"
            @blur="hideOverlay"
          ></v-text-field>
          <router-link to="/connection">
            <v-btn color="white" text>Se connecter</v-btn>
          </router-link>
          <v-btn @click="logout" color="white" text>Se deconnecter</v-btn>
          <v-btn color="white" text to="/profil">Profil</v-btn>
        </v-app-bar>
      </v-app>

        <div class="content">
          <router-view />
        </div>

        <div class="overlay" :class="{ visible: showOverlay && showResults }">
          <v-card v-if="showResults" class="search-results">
            <v-card-text>
              <b>NOM & PRENOM</b><hr /><br />
              <ul>
                <li v-for="result in nameResults" :key="result.id" >
                  <button @click="handleResultClick(result)"><b>{{ result.name }}</b>  {{ result.firstname }} </button>
                </li>
              </ul>
              <ul>
                <li v-for="result in firstnameResults" :key="result.id" >
                  <button @click="handleResultClick(result)">{{ result.name }}  <b>{{ result.firstname }}</b> </button>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//Used to avoid the bounce for the function
import _ from 'lodash';

export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      nameResults: [],
      firstnameResults: [],
      searchDebounced: null,
      showResults: false,
      showOverlay: false,
    };
  },
  watch: {
    searchQuery: function(newQuery) {
        if (this.searchDebounced) {
          this.searchDebounced(newQuery);
        }
    },
  },
  mounted() {
    //Create a wait of 500ms before using the function again
    this.searchDebounced = _.debounce(this.search, 500);
  },
  methods: {
    async search() {

        try {
          if (this.searchQuery === '') {
            this.nameResults = [];
            this.firstnameResults = [];
            return;
          }

            //Get request for the backend with the letters used in the searchbar as parameters
            const response = await axios.get(`http://localhost:3000/api/user/search`, {
                params: {
                    search: this.searchQuery,
                },
            });
            this.nameResults = response.data.names;
            this.firstnameResults = response.data.firstNames;
        } catch (error) {
            this.nameResults = [];
            this.firstnameResults = [];
            console.log(error);
        }
        },
        //Handle the search
        handleSearch() {
          if (this.searchQuery === '') {
            this.nameResults = [];
            this.firstnameResults = [];
            this.showResults = false;
          } else {
            this.searchDebounced(this.searchQuery);
            //Timeout because if someone make an error and erase his search and make a new one, the page has to take the time to make a new request
            setTimeout(() => {
              this.showResults = true;
            }, 800);
          }
        },
        //Handle the case if someone write something in the searchbar and then loose focus. When returned the search will be made again
        handleSearchFocus() {
            this.showOverlay = true;
            this.handleSearch();
        },
        //Handle when the user loose the focus of the searchbar, the result box is hidden
        hideOverlay() {
            setTimeout(() => {
                this.showResults = false;
                this.showOverlay = false;
            }, 200);
        },
        //Handle when the user click on a user from his search
        handleResultClick(result) {
            console.log('Cliqué : ', result.id);
            this.searchQuery = '';
            this.$router.push(`/utilisateur/${result.id}`);
        },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/connection');
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  position: relative;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.overlay.visible {
  z-index: 3;
  opacity: 1;
  pointer-events: auto;
}

.search-results {
  max-height: 80%;
  overflow-y: auto;
}


ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

ul li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: hsla(0, 0%, 0%, 0.8);
}

.nav {
  padding: 0.5rem 0 0.5rem;

  #logo {
  margin: 0 2rem;
}
}
</style>

