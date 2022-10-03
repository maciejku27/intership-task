<template>
  <form @submit.prevent="getLocation">
    <input
      type="text"
      v-model="searchLocation"
      placeholder="Search location..." />
    <button>Search</button>
  </form>
  <div>{{ info }}</div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    locations: [],
    searchLocation: '',
    //isLoading: true,
    //search: null,
    info: null,
  }),
  methods: {
    getLocation() {
      axios
        .get(
          'http://api.openweathermap.org/geo/1.0/direct?q=' +
            this.searchLocation +
            '&limit=5&appid=67cd127ea4ab6b435f50093b78e4d4d6'
        )
        .then((response) => {
          this.info = response.data;
        });
    },
    /*
      getLocations(params = ' ') {
      this.axios
        .get(
          'http://api.openweathermap.org/geo/1.0/direct' +
            params +
            '&limit=5&appid=67cd127ea4ab6b435f50093b78e4d4d6'
        )
        .then((resp) => {
          const tempLocations = [
            ...this.locations.slice(0),
            ...resp.data.results,
          ];
          this.locations = _.uniqBy(tempLocations, 'id');
          this.isLoading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    searchLocations(query) {
      const searchQuery = encodeURI('?q=' + query);
      this.getLocations(searchQuery);
    },
  },
  watch: {
    search: _.debounce(function (query) {
      this.searchLocations(query);
    }, 250),
  },*/
  },
};
</script>
