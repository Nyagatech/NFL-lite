<template>
<label class="form-control w-full max-w-xs">
    <div class="label">
      What is your favorite show?
    </div>
    <input type="text" placeholder="Type TV show name" v-model="searchTerm" class="input input-bordered w-full max-w-xs" />
  </label>
  <p>{{ searchTerm }}</p>
  </template>
  <script setup>
  import { ref } from 'vue'
  const searchTerm = ref('')

</script>