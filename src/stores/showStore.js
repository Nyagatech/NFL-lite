
import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    shows: [],
    loading: true,
    error: null,

  }),
  actions:{
    async fetchShows() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get("https://api.tvmaze.com/shows");
          this.shows = response.data;
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
    },

  }
});