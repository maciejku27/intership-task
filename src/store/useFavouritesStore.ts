import { defineStore } from 'pinia';
//TODO create favourites store for favourited locations

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    location: [],
    id: 0,
  }),
  getters: {},
  actions: {
    /* addLocation(item) {
      this.location.push({ item, id: this.id++ });
    },
    deleteLocation(itemID) {
      this.location = this.location.filter((object) => {
        return object.id !== itemID;
      });
    },*/
  },
});
