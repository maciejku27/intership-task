<template>
  <a-space direction="vertical" :size="16">
    <SearchBar @event="getLocation" />
    <a-card style="width: 500px">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Weather">
          <ShowWeather
            :searchLocation="searchLocation"
            :main="main"
            :sys="sys"
            :weather="weather"
            :wind="wind"
            :report="report"></ShowWeather>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Air Quality" force-render>
          <AirPollution
            :searchLocation="searchLocation"
            :air="air"
            :substance="substance"></AirPollution>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Other">
          <OtherInfo
            :searchLocation="searchLocation"
            :weather="weather"></OtherInfo>
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
import OtherInfo from '@components/molecules/Other/OtherInfo.vue';
import SearchBar from '@components/molecules/Search/SearchBar.vue';

export default defineComponent({
  name: 'WeatherReport',
  components: { ShowWeather, AirPollution, OtherInfo, SearchBar },
  data: () => ({
    searchLocation: '',
    weather: {} as Weather,
    coord: {} as Coord,
    main: {} as Main,
    wind: {} as Wind,
    sys: {} as Sys,
    report: String,
    geo: null,
    substance: {} as { [key: string]: number },
    air: null,
    activeKey: '1',
  }),
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
