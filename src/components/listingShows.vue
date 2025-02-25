<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TV Shows</h1>
    <SearchBar @search="showsStore.searchShow" />

    <div v-if="showsStore.loading" class="text-center text-3xl font-bold">Loading...</div>
    <div v-if="showsStore.error" class="text-red-500 text-center">{{ showsStore.error }}</div>

    <div v-else-if="showsStore.searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ShowCard v-for="show in showsStore.searchResults" :key="show.id" :show="show" />
    </div>

    <div v-else-if="showsStore.searchResults.length === 0 && showsStore.shows.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ShowCard v-for="show in showsStore.shows" :key="show.id" :show="show" />
    </div>

    <div v-else-if="!showsStore.loading && !showsStore.error && showsStore.searchResults.length === 0 && showsStore.shows.length === 0">
      <p class="text-center">No shows found.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useShowStore } from '@/stores/showsStore';
import SearchBar from './searchBar.vue';
import ShowCard from './showCard.vue'; // Import ShowCard component

const showsStore = useShowStore();

onMounted(() => {
  showsStore.fetchShows();
});
</script>