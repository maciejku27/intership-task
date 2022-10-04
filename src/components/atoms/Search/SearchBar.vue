<template>
  <a-space direction="vertical" :size="16">
    <form @submit.prevent="getLocation">
      <input
        type="text"
        v-model="searchLocation"
        placeholder="Search location..." />
      <button>Search</button>
    </form>
    <a-input-search
      type="text"
      v-model:search="searchLocation"
      placeholder="Search location..."
      enter-button="Search"
      size="large"
      @search="getLocation" />
    <a-card v-if="info != null">
      <a-space align="baseline" :size="40">
        <a-typography-title>{{ info }}</a-typography-title>
        <a-typography-title :level="3"> {{ info2 }}°C </a-typography-title>
      </a-space>
      <div>
        <a-space :size="30">
          <a-typography-text>Pressure:{{ info5 }}hPa </a-typography-text>
          <a-typography-text>Visibility:{{ info6 }}m </a-typography-text>
        </a-space>
      </div>
      <div>
        <a-space :size="30">
          <a-typography-text>Wind: {{ info3 }}m/s </a-typography-text>
          <a-typography-text>Humidity: {{ info4 }}% </a-typography-text>
        </a-space>
      </div>
    </a-card>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'SearchBar',
  data: () => ({
    searchLocation: '',
    info: null,
    info2: null,
    info3: null,
    info4: null,
    info5: null,
    info6: null,
  }),
  methods: {
    getLocation() {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/weather?q=' +
            this.searchLocation +
            '&units=metric&limit=5&appid=67cd127ea4ab6b435f50093b78e4d4d6'
        )
        .then((response) => {
          this.info = response.data.name;
          this.info2 = response.data.main.temp;
          this.info3 = response.data.wind.speed;
          this.info4 = response.data.main.humidity;
          this.info5 = response.data.main.pressure;
          this.info6 = response.data.visibility;
        });
    },
  },
});
</script>
