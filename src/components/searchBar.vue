<template>
<label class="form-control w-full max-w-xs">
    <div class="label">
      What is your favorite show?
    </div>
    <input type="text" placeholder="Search Tv Shows ..." v-model="searchTerm" class="input input-bordered w-full max-w-xs" />
  </label>
  </template>
  <script setup>
  import { ref, watch } from 'vue'
  import { useShowStore } from '@/stores/showsStore';

  const showStore = useShowStore();
  const searchTerm = ref('');
  
//This line allows us to use the searchShows method from the showStore
  watch(searchTerm, (newVal) => {
    showStore.searchShow(newVal);
  });

</script>