<template>
  <div class="m-4">
    <div class="mb-1">
      What is your favorite show?
    </div>
    <input
      type="text"
      placeholder="Search Tv Shows ..."
      v-model="searchTerm"
      class="border rounded p-2 border-slate-300 focus:border-slate-950 focus:outline-none w-full max-w-xs"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useShowStore } from '@/stores/showsStore';

const showStore = useShowStore();
const searchTerm = ref('');

watch(searchTerm, (newVal) => {
  showStore.searchShow(newVal);
});
</script>