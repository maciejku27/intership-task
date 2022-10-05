<template>
  <a-space direction="vertical" :size="16">
    <a-input-search
      type="text"
      v-model:value="searchLocation"
      placeholder="Search location..."
      enter-button="Search"
      size="large"
      @search="getLocation" />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Weather">
        <a-card v-if="name != null">
          <div>
            <a-typography-title :level="3">
              {{ name }},{{ country }}
            </a-typography-title>
          </div>
          <div>
            <a-typography-title> {{ temp }}°C </a-typography-title>
          </div>
          <div>
            <a-space :size="30">
              <a-statistic title="Pressure:" :value="pressure" suffix="hPa" />
              <a-statistic title="Visibility:" :value="visibility" suffix="m" />
            </a-space>
          </div>
          <div>
            <a-space :size="45">
              <a-statistic title="Wind:" :value="windSpeed" suffix="m/s" />
              <a-statistic title="Humidity:" :value="humidity" suffix="%" />
            </a-space>
          </div>
        </a-card>
        <a-card v-else>
          <a-typography-title :level="4">
            Write a name of the country you want to check weather of in the
            search bar
          </a-typography-title>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Air Quality" force-render>
        <a-card v-if="name != null">
          <a-space align="baseline" :size="40">
            <a-typography-title>{{ name }}</a-typography-title>
            <a-typography-title :level="3"> {{ temp }}°C </a-typography-title>
          </a-space>
          <div>
            <a-space :size="30">
              <a-typography-text>Pressure:{{ pressure }}hPa </a-typography-text>
              <a-typography-text>
                Visibility:{{ visibility }}m
              </a-typography-text>
            </a-space>
          </div>
          <div>
            <a-space :size="30">
              <a-typography-text>Wind: {{ windSpeed }}m/s </a-typography-text>
              <a-typography-text>Humidity: {{ humidity }}% </a-typography-text>
            </a-space>
          </div>
        </a-card>
        <a-card v-else>
          <a-typography-title :level="4">
            Write a name of the country you want to check air quality of in the
            search bar
          </a-typography-title>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Other">
        <a-card>
          <a-typography-title :level="4">
            {{ air }}
          </a-typography-title>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'SearchBar',
  data: () => ({
    searchLocation: '',
    name: null,
    temp: null,
    windSpeed: null,
    humidity: null,
    pressure: null,
    visibility: null,
    country: null,
    lat: null,
    lon: null,
    air: null,
    activeKey: '1',
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
          this.name = response.data.name;
          this.temp = response.data.main.temp;
          this.windSpeed = response.data.wind.speed;
          this.humidity = response.data.main.humidity;
          this.pressure = response.data.main.pressure;
          this.visibility = response.data.visibility;
          this.country = response.data.sys.country;
          this.lat = response.data.coord.lat;
          this.lon = response.data.coord.lon;
        });
    },
    getAirPollution() {
      axios
        .get(
          'http://api.openweathermap.org/data/2.5/air_pollution?lat=' +
            this.lat +
            '&lon=' +
            this.lon +
            '&appid=67cd127ea4ab6b435f50093b78e4d4d6'
        )
        .then((response) => {
          this.air = response.data.list[1];
        });
    },
  },
});
</script>
