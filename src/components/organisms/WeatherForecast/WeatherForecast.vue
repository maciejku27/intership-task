<template>
  <a-space direction="vertical" :size="16">
    <a-input-search
      type="text"
      v-model:value="searchLocation"
      placeholder="Search location..."
      enter-button="Search"
      size="large"
      @search="getLocation()" />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Weather">
        <ShowWeather
          :searchLocation="searchLocation"
          :main="main"
          :sys="sys"
          :weather="weather"
          :wind="wind"></ShowWeather>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Air Quality" force-render>
        <AirPollution
          :searchLocation="searchLocation"
          :air="air"
          :substance="substance"></AirPollution>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Other">
        <OtherInfo :searchLocation="searchLocation" :date="date"></OtherInfo>
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Coord, Main, Weather, Wind, Sys } from '@types';
import ShowWeather from '@components/molecules/Weather/ShowWeather.vue';
import AirPollution from '@components/molecules/AirPollution/AirPollution.vue';
import OtherInfo from '@components/molecules/Other/OtherInfo.vue';

export default defineComponent({
  name: 'WeatherForecast',
  components: { ShowWeather, AirPollution, OtherInfo },
  data: () => ({
    searchLocation: '',
    weather: {} as Weather,
    coord: {} as Coord,
    main: {} as Main,
    wind: {} as Wind,
    sys: {} as Sys,
    date: Number,
    substance: {} as { [key: string]: number },
    air: null,
    activeKey: '1',
  }),
  methods: {
    getLocation() {
      axios
        .get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: this.searchLocation,
            units: 'metric',
            limit: 5,
            appid: '67cd127ea4ab6b435f50093b78e4d4d6',
          },
        })
        .then((response) => {
          this.weather = response.data;
          this.coord = response.data.coord;
          this.main = response.data.main;
          this.sys = response.data.sys;
          this.wind = response.data.wind;
          this.date = response.data.dt;
          axios
            .get(
              'http://api.openweathermap.org/data/2.5/air_pollution',

              {
                params: {
                  lon: response.data.coord.lon,
                  lat: response.data.coord.lat,
                  appid: '67cd127ea4ab6b435f50093b78e4d4d6',
                },
              }
            )
            .then((response) => {
              this.substance = response.data.list[0].components;
              this.air = response.data.list[0].main.aqi;
            });
        });
    },
  },
});
</script>
