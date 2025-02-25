<template>
  <router-link
    :to="{ name: 'ShowDetails', params: { id: show.id } }"
    class="block transition-transform transform hover:scale-105"
  >
    <div
      class="border rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div class="relative pb-[150%] mb-2">
        <img
          v-if="show.image && show.image[imageSize]"
          :src="show.image[imageSize]"
          :alt="show.name"
          class="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <h2 class="text-lg font-semibold truncate mb-1">{{ show.name }}</h2>
      <p v-if="show.rating && show.rating.average" class="text-sm">
        Rating: <span class="text-yellow-500">{{ show.rating.average }}</span>
      </p>
      <button @click.prevent="toggleFavorite" class="mt-2">
        <span v-if="isFavorite" class="text-red-500">❤️</span>
        <span v-else>🤍</span>
      </button>
      <slot></slot>
      <slot name="actions"></slot>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { useShowStore } from "@/stores/showsStore";

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
  imageSize: {
    type: String,
    default: "medium",
  },
});

const showStore = useShowStore();

const isFavorite = computed(() => {
  return showStore.isFavouriteShow(props.show.id);
});

const toggleFavorite = () => {
  if (isFavorite.value) {
    showStore.removeFavouriteShow(props.show.id);
  } else {
    showStore.addFavouriteShow(props.show.id);
  }
};
</script>