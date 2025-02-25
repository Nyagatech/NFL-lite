import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    shows: [],
    loading: true,
    error: null,
    searchResults: [],
    selectedShow: null,
    episodes: [],
  }),
  actions: {
    async fetchShows() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("https://api.tvmaze.com/shows");
        this.shows = response.data;
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    async searchShow(query) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        this.searchResults = response.data.map((result) => result.show);
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    async fetchShowDetails(id) {
      this.loading = true;
      this.error = null;
      try {
        const showResponse = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        this.selectedShow = showResponse.data;

        const episodesResponse = await axios.get(
          `https://api.tvmaze.com/shows/${id}/episodes`
        );
        this.episodes = episodesResponse.data;
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    clearShowDetails() {
      this.selectedShow = null;
      this.episodes = [];
    },
  },
});