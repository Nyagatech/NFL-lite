import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    shows: [],
    loading: false,
    error: null,
    searchResults: [],
    selectedShow: null,
    episodes: [],
    page: 1,
    showsPerPage: 10,
    favouriteShowIds: [],
  }),
  actions: {
    // This function fetches shows from the API with pagination
    async fetchShows() {
      this.loading = true;
      this.error = null;
      try {
        const start = (this.page - 1) * this.showsPerPage;
        const response = await axios.get(
          `https://api.tvmaze.com/shows?page=${this.page - 1}`
        );
        this.shows = response.data.slice(0, this.showsPerPage);
      } catch (error) {
        this.error = error.message || "An error occurred";
      } finally {
        this.loading = false;
      }
    },
    // This function searches for a show using the API
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
    // This function fetches the details of a show using the API
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
      this.fetchShows();
    },
    // This function adds a show to the favourites
    addFavouriteShow(showId) {
      if (!this.favouriteShowIds.includes(showId)) {
        this.favouriteShowIds.push(showId);
        this.saveFavourites();
      }
    },
    // This function removes a show from the favourites
    removeFavouriteShow(showId) {
      this.favouriteShowIds = this.favouriteShowIds.filter(
        (id) => id !== showId
      );
      this.saveFavourites();
    },
    // This function checks if a show is in the favourites
    isFavouriteShow(showId) {
      return this.favouriteShowIds.includes(showId);
    },
    loadFavourites() {
      try {
        const favourites = localStorage.getItem("netflix-lite-favourites");
        if (favourites) {
          this.favouriteShowIds = JSON.parse(favourites);
        }
      } catch (error) {
        console.error("Error loading favorites from local storage:", error);
        this.favouriteShowIds = [];
      }
    },
    // This function saves the favourites to local storage
    saveFavourites() {
      localStorage.setItem(
        "netflix-lite-favourites",
        JSON.stringify(this.favouriteShowIds)
      );
    },
  },
});