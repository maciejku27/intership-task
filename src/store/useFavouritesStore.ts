import { defineStore } from 'pinia';
//TODO create favourites store for favourited locations

interface FavItem {
  item: string;
  id: number;
}

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favourite: new Map<string, FavItem>(),
    id: 0,
  }),
  getters: {},
  actions: {
    addFavourite(item: string) {
      this.favourite.set(item, { item, id: 1 });
    },
    checkFavourite(item: string) {
      return this.favourite.has(item);
    },
    deleteFavourite(item: string) {
      this.favourite.delete(item);
    },
    showFavourites() {
      return this.favourite.values().next().value;
    },
  },
});
