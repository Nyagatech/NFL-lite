<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Favorite Shows</h1>
  
      <div v-if="loading" class="text-center">Loading favorite shows...</div>
  
      <div v-else-if="favoriteShows.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ShowCard v-for="show in favoriteShows" :key="show.id" :show="show" />
      </div>
  
      <div v-else-if="!loading && error">
        <p class="text-red-500">Error fetching favorite shows: {{ error }}</p>
      </div>
  
      <div v-else>
        <p>You have no favorite shows.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useShowStore } from "@/stores/showsStore";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import ShowCard from "./showCard.vue";
  
  const showStore = useShowStore();
  const favoriteShows = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    loading.value = true;
    error.value = null;
  
    if (showStore.favouriteShowIds.length > 0) {
      try {
        const responses = await Promise.all(
          showStore.favouriteShowIds.map((id) =>
            axios.get(`https://api.tvmaze.com/shows/${id}`)
          )
        );
        favoriteShows.value = responses.map((response) => response.data);
      } catch (err) {
        error.value = err.message || "An error occurred";
        console.error("Favorites.vue: Error fetching favorite shows:", err);
      } finally {
        loading.value = false;
      }
    } else {
      loading.value = false;
    }
  });
  </script>