import { createRouter, createWebHistory } from 'vue-router';

import Accueil from '@/views/Accueil.vue'
import Inscription from '@/views/Inscription.vue'
import Connection from '@/views/Connection.vue'
import Profil from '@/views/Profil.vue'
import Utilisateur from '@/views/Utilisateur.vue'
import Completion_profil from '@/views/Completion-profil.vue'


const routes = [
  {path: '/', name:'Accueil', component: Accueil},
  {path: '/inscription', name:'Inscription', component: Inscription},
  {path: '/connection', name:'Connection', component: Connection},
  {path: '/profil', name:'Profil', component: Profil},
  {path: '/utilisateur/:userId', name:'Utilisateur', component: Utilisateur}
  {path: '/completion-profil', name:'Completion-profil', component: Completion_profil}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router