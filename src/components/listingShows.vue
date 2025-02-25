<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TV Shows</h1>
    <SearchBar />

    <div v-if="showsStore.loading" class="text-center text-3xl font-bold">Loading...</div>
    <div v-if="showsStore.error" class="text-red-500 text-center">{{ showsStore.error }}</div>

    <div v-else-if="showsStore.searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="show in showsStore.searchResults" 
        :key="show.id" 
        class="border rounded p-2 cursor-pointer"
        @click="navigateToShowDetails(show.id)"
      >
        <img :src="show.image?.medium" :alt="show.name" class="w-full h-48 object-cover mb-2" />
        <h2 class="text-lg font-semibold">{{ show.name }}</h2>
        <p class="text-sm">Rating: {{ show.rating?.average || 'N/A' }}</p>
      </div>
    </div>

    <div v-else-if="showsStore.searchResults.length === 0 && showsStore.shows.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="show in showsStore.shows" 
        :key="show.id" 
        class="border rounded p-2 cursor-pointer"
        @click="navigateToShowDetails(show.id)"
      >
        <img :src="show.image?.medium" :alt="show.name" class="w-full h-48 object-cover mb-2" />
        <h2 class="text-lg font-semibold">{{ show.name }}</h2>
        <p class="text-sm">Rating: {{ show.rating?.average || 'N/A' }}</p>
      </div>
    </div>

    <div v-else-if="!showsStore.loading && !showsStore.error && showsStore.searchResults.length === 0 && showsStore.shows.length === 0">
      <p class="text-center">No shows found.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useShowStore } from '@/stores/showsStore';
import { useRouter } from 'vue-router';
import SearchBar from './searchBar.vue';

const showsStore = useShowStore();
const router = useRouter();

onMounted(() => {
  showsStore.fetchShows();
});

const navigateToShowDetails = (showId) => {
  console.log("Navigating to show details with ID:", showId);
  showsStore.fetchShowDetails(showId);
  router.push({ name: 'ShowDetails', params: { id: showId } });
};
</script>
