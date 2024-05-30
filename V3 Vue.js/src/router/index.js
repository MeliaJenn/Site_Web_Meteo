import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ContactView from '../views/ContactView.vue'
import AideView from '../views/AideView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/aide',
      name: 'aide',
      component: AideView
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'accueil' }
    }
  ]
})

export default router

// lancer le site : 
// Aller dans le dossier principal et executer : npm run dev

