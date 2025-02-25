<template>
    <div class="bg-gray-900">
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">TV Shows</h1>
      <searchInput />
    
  
      <div v-if="showsStore.loading" class="text-center">Loading...</div>
  
      <div v-if="showsStore.error" class="text-red-500 text-center">{{ showsStore.error }}</div>
  
      <div v-if="showsStore.shows.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="show in showsStore.shows" :key="show.id" class="border rounded p-2">
          <img :src="show.image?.medium" :alt="show.name" class="w-full h-48 object-cover mb-2" />
          <h2 class="text-lg font-semibold">{{ show.name }}</h2>
          <p class="text-sm">Rating: {{ show.rating?.average || 'N/A' }}</p>
        </div>
      </div>
  
      <div v-else-if="!showsStore.loading && !showsStore.error && showsStore.shows.length === 0">
        <p class="text-center">No shows found.</p>
      </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import searchInput from './searchInput.vue';
  import { useShowStore } from '../stores/showsStore';
  
  const showsStore = useShowStore();
  
  onMounted(() => {
    showsStore.fetchShows();
  });
  </script>