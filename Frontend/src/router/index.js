import { createRouter, createWebHistory } from 'vue-router';

import Accueil from '@/views/Accueil.vue'
import Inscription from '@/views/Inscription.vue'
import Connection from '@/views/Connection.vue'
import Profil from '@/views/Profil.vue'
import Ajout_photo from '@/views/Ajout-photo.vue'

const routes = [
  {path: '/', name:'Accueil', component: Accueil},
  {path: '/inscription', name:'Inscription', component: Inscription},
  {path: '/connection', name:'Connection', component: Connection},
  {path: '/profil', name:'Profil', component: Profil},
  {path: '/ajout-photo', name:'Ajout-photo', component: Ajout_photo}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router