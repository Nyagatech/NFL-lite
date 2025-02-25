<template>
    <div v-if="showStore.loading" class="text-center">Loading...</div>
    <div v-if="showStore.error" class="text-red-500 text-center">{{ showStore.error }}</div>
    <div v-if="showStore.selectedShow" class="container mx-auto p-4">
      <button @click="goBack" class="mb-4 bg-slate-950 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
  </button>
      <div class="flex flex-col md:flex-row">
        <img :src="showStore.selectedShow.image?.original" :alt="showStore.selectedShow.name" class="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4" />
        <div class="md:w-2/3">
          <h1 class="text-3xl font-bold mb-2">{{ showStore.selectedShow.name }}</h1>
          <p class="text-lg mb-2">Rating: {{ showStore.selectedShow.rating?.average || 'N/A' }}</p>
          <div v-html="showStore.selectedShow.summary" class="mb-4"></div>
          <h2 class="text-2xl font-semibold mb-2">Episodes</h2>
          <div v-if="showStore.episodes.length > 0">
            <div v-for="episode in showStore.episodes" :key="episode.id" class="border rounded p-2 mb-2">
              <p class="font-semibold">{{ episode.name }} (Season {{ episode.season }}, Episode {{ episode.number }})</p>
              <img :src="episode.image?.medium" :alt="episode.name" v-if="episode.image" class="w-full h-48 object-cover mt-2" />
            </div>
          </div>
          <div v-else>
            <p>No episodes available.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShowStore } from '@/stores/showsStore';

const route = useRoute();
const router = useRouter();
const showStore = useShowStore();
const showId = route.params.id;

onMounted(() => {
  showStore.fetchShowDetails(showId);
});

onUnmounted(() => {
  showStore.clearShowDetails();
});

const goBack = () => {
  router.go(-1);
};
</script>