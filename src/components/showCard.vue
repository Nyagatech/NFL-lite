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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-star inline-block text-yellow-500 pl-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
          />
        </svg>
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