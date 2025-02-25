import { createRouter, createWebHistory } from 'vue-router'
import listingShows from '@/components/listingShows.vue'
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: listingShows
     
    },
    {
      
      
    },
  ],
})

export default router
