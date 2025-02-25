
import { defineStore } from "pinia";
import axios from "axios";

export const useShowStore = defineStore("showStore", {
  state: () => ({
    shows: [],
    loading: true,
    error: null,
    searchResults: [],

  }),
  actions:{
   // this is the function that will be called when the user clicks on the "Load Shows" button on the home page
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
    //This is the function that will be called when the user types in the search bar
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
  }
});