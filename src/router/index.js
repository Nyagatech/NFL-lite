import { createRouter, createWebHistory } from 'vue-router'
import listingShows from '@/components/listingShows.vue'
import index from '@/components/index.vue'
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: index
     
    },
    {
      path: '/shows',
      name: 'ListingShows',
      component: listingShows
    },
    {
      path: '/show/:id',
      name: 'ShowDetails',
      component: () => import('@/components/showDetails.vue')
    },
    {
      path: '/favourites'
      ,name: 'Favourites',
      component: () => import('@/components/favourites.vue')
    }
  ],
})

export default router
