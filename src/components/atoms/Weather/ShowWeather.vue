<template>
  <div id="weather">
    <form v-on:submit.prevent="getWeather">
      <p><input type="text" name="location" v-model="location" /></p>
      <p><button class="btn btn-primary">Search</button></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      location: '',
      apiKey: '67cd127ea4ab6b435f50093b78e4d4d6',
      weather: [],
      displayWeather: false,
    };
  },

  methods: {
    getWeather: function () {
      return this.$http
        .get(
          'http://api.openweathermap.org/data/2.5/weather?q=' +
            this.location +
            '&appid=' +
            this.apiKey
        )
        .then(
          (response) => {
            this.weather = response.body;
            this.displayWeather = true;
          },
          (response) => {
            this.weather = [];
            this.displayWeather = false;
          }
        );
    },
  },
};
</script>
