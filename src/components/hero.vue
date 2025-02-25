<template>
    <div class="hero h-screen relative">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to NetflixLite</h1>
        <p class="text-lg md:text-xl mb-8">Your favorite shows, all in one place.</p>
        <router-link to="/" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full">
          Explore Shows
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  const hero =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fnetflix-background-m1cn7ff1spxgr9fu.jpg&f=1&nofb=1&ipt=22b1905eb178decc7dfa37b2412a55122ee8692ff0d7c5808dec1dc2ba0f2f65&ipo=images";
  </script>
  
  <style scoped>
  .hero {
    background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fnetflix-background-m1cn7ff1spxgr9fu.jpg&f=1&nofb=1&ipt=22b1905eb178decc7dfa37b2412a55122ee8692ff0d7c5808dec1dc2ba0f2f65&ipo=images");
    background-size: cover;
    background-position: center;
  }
  </style>