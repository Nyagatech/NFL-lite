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
    page: 1,
    showsPerPage: 10,
  }),
  actions: {
    // This function fetches all the shows from the API with pagination
    async fetchShows(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows?page=${page}`
        );
        this.shows = response.data;
        this.page = page; // Update the current page
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    // This function fetches the search results from the API
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
    // This function fetches the details of a show from the API
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
    // This function clears the selected show details
    clearShowDetails() {
      this.selectedShow = null;
      this.episodes = [];
    },
    setPage(page) {
      this.page = page;
      this.fetchShows(page);
    },
  },
});