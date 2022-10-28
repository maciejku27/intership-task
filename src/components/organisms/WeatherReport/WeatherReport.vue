<template>
  <a-space direction="vertical" :size="16">
    <SearchBar @event="getLocation" />
    <a-card style="width: 500px">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Weather">
          <ShowWeather
            :main="main"
            :coord="coord"
            :sys="sys"
            :weather="weather"
            :wind="wind"
            :report="report"
            :isShown="isShown"
            @event="getLocation"></ShowWeather>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Air Quality" force-render>
          <AirPollution
            :air="air"
            :substance="substance"
            :isShown="isShown"
            @event="getLocation"></AirPollution>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Coord, Main, Weather, Wind, Sys } from '@types';
import ShowWeather from '@components/molecules/Weather/ShowWeather.vue';
import AirPollution from '@components/molecules/AirPollution/AirPollution.vue';
import SearchBar from '@components/molecules/Search/SearchBar.vue';
import { useFavouritesStore } from '@store/useFavouritesStore';

export default defineComponent({
  name: 'WeatherReport',
  components: { ShowWeather, AirPollution, SearchBar },
  data: () => ({
    weather: {} as Weather,
    coord: {} as Coord,
    main: {} as Main,
    wind: {} as Wind,
    sys: {} as Sys,
    report: String,
    substance: {} as { [key: string]: number },
    isShown: false,
    air: {} as number,
    activeKey: '1',
  }),
  setup() {
    const store = useFavouritesStore();

    return { store };
  },
  methods: {
    getLocation(lat: number, lon: number) {
      axios
        .get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: lat,
            lon: lon,
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
          this.report = response.data.weather[0];
          this.isShown = true;
          axios
            .get('http://api.openweathermap.org/data/2.5/air_pollution', {
              params: {
                lon: lon,
                lat: lat,
                appid: '67cd127ea4ab6b435f50093b78e4d4d6',
              },
            })
            .then((response) => {
              this.substance = response.data.list[0].components;
              this.air = response.data.list[0].main.aqi;
            });
        });
    },
  },
});
</script>
