<template>
    <nav class="bg-gray-950 p-4 sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-white font-bold text-xl">
          NetflixLite
        </router-link>
  
        <button class="lg:hidden text-white focus:outline-none" @click="toggleMenu">
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
  
        <div class="hidden lg:flex items-center space-x-4">
          <router-link
            v-for="l in navLinks"
            :key="l.path"
            :to="l.path"
            class="text-white relative"
            :class="{ 'font-semibold text-blue-400': $route.path === l.path }"
          >
            {{ l.label }}
            <span v-if="$route.path === l.path" class="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 h-[2px] w-1/2 bg-slate-600"></span>
          </router-link>
        </div>
      </div>
  
      <div
        ref="sidebar"
        class="lg:hidden fixed top-0 right-0 h-full w-1/2 bg-gray-950 p-4 transition-transform transform z-50"
        :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      >
        <div class="flex flex-col h-full">
          <div class="flex justify-end mb-4">
            <button class="text-white focus:outline-none" @click="toggleMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <router-link
            v-for="l in navLinks"
            :key="l.path"
            :to="l.path"
            class="text-white py-2 flex items-center relative"
            :class="{ 'font-semibold text-blue-400': $route.path === l.path }"
          >
            <svg v-if="l.label === 'Home'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house h-5 w-5 mr-2" viewBox="0 0 16 16"> <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
            <svg v-else :xmlns="l.icon.xmlns" class="h-5 w-5 mr-2" fill="none" :viewBox="l.icon.viewBox" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="l.icon.d"></path></svg>
            {{ l.label }}
            <span v-if="$route.path === l.path" class="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 h-[2px] w-1/2 bg-slate-600"></span>
          </router-link>
          <div class="flex-grow"></div>
        </div>
      </div>
      <div v-if="isMenuOpen" @click="closeSidebar" class="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"></div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const isMenuOpen = ref(false);
  const sidebar = ref(null);
  
  const navLinks = [
    { path: '/', label: 'Home', icon: { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', d: 'M3 12l2-2m0 0l7-7a7 7 0 2110 3v8a7 7 0 11-10 3zm10 3.846l-2-2m2 2l7-7m-7 7l-2-2' } },
    { path: '/shows', label: 'Shows', icon: { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', d: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H9.83l-4 4z' } },
    { path: '/favourites', label: 'Favourites', icon: { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 13.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' } },
  ];
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const closeSidebar = () => {
    isMenuOpen.value = false;
  };
  
  const handleClickOutside = (event) => {
    if (isMenuOpen.value && !sidebar.value.contains(event.target)) {
      closeSidebar();
    }
  };
  
  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });
  
  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
  </script>