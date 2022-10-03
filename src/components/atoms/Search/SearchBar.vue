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

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
//import { Weather } from '@types';

export default defineComponent({
  name: 'SearchBar',
  data: () => ({
    searchLocation: '',
    info: null,
  }),
  methods: {
    getLocation() {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/weather?q=' +
            this.searchLocation +
            '&limit=5&appid=67cd127ea4ab6b435f50093b78e4d4d6'
        )
        .then((response) => {
          this.info = response.data;
        });
    },
  },
});
</script>
