import { defineStore } from 'pinia';
interface FavItem {
  item: string;
  id: number;
  lat: number;
  lon: number;
}

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favourite: new Map<string, FavItem>(),
    id: 0,
  }),
  getters: {},
  actions: {
    addFavourite(item: string, lat: number, lon: number) {
      this.favourite.set(item, { item, id: this.id++, lat, lon });
    },
    checkFavourite(item: string) {
      return this.favourite.has(item);
    },
    deleteFavourite(item: string) {
      this.favourite.delete(item);
    },
  },
});
