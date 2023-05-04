import { createRouter, createWebHistory } from 'vue-router';

import Accueil from '@/views/Accueil.vue'
import Inscription from '@/views/Inscription.vue'
import Connection from '@/views/Connection.vue'

const routes = [
  {path: '/', name:'Accueil', component: Accueil},
  {path: '/inscription', name:'Inscription', component: Inscription},
  {path: '/connection', name:'Connection', component: Connection}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router