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
        <a-card v-if="searchLocation != ''">
          <div>
            <a-typography-title :level="3">
              {{ weather.name }},{{ sys.country }}
            </a-typography-title>
          </div>
          <div>
            <a-typography-title> {{ main.temp }}°C </a-typography-title>
          </div>
          <div>
            <a-space :size="30">
              <a-statistic
                title="Pressure:"
                :value="main.pressure"
                suffix="hPa" />
              <span v-if="weather.visibility >= 9000">
                <a-statistic title="Visibility:" :value="'Good'" />
              </span>
              <span
                v-if="weather.visibility < 9000 && weather.visibility >= 4000">
                <a-statistic title="Visibility:" :value="'Moderate'" />
              </span>
              <span
                v-if="weather.visibility < 4000 && weather.visibility >= 1500">
                <a-statistic title="Visibility:" :value="'Poor'" />
              </span>
              <span v-if="weather.visibility < 1500 && weather.visibility >= 0">
                <a-statistic title="Visibility:" :value="'Very Poor'" />
              </span>
            </a-space>
          </div>
          <div>
            <a-space :size="45">
              <a-statistic title="Wind:" :value="wind.speed" suffix="m/s" />
              <a-statistic
                title="Humidity:"
                :value="main.humidity"
                suffix="%" />
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
        <a-card v-if="searchLocation != ''">
          <a-typography-title :level="3" v-if="air == 1">
            Quality of an air:
            <a-tag color="green" style="font-size: large">Good</a-tag>
          </a-typography-title>
          <a-typography-title :level="3" v-if="air == 2">
            Quality of an air:
            <a-tag color="yellow" style="font-size: large">Fair</a-tag>
          </a-typography-title>
          <a-typography-title :level="3" v-if="air == 3">
            Quality of an air:
            <a-tag color="orange" style="font-size: large">Moderate</a-tag>
          </a-typography-title>
          <a-typography-title :level="3" v-if="air == 4">
            Quality of an air:
            <a-tag color="red" style="font-size: large">Poor</a-tag>
          </a-typography-title>
          <a-typography-title :level="3" v-if="air == 5">
            Quality of an air:
            <a-tag color="purple" style="font-size: large">Very Poor</a-tag>
          </a-typography-title>
          <a-typography-title :level="4">
            Concentration of each substance:
          </a-typography-title>
          <div>
            <a-space :size="45">
              <a-statistic title="CO:" :value="substance.co" suffix="μg/m3" />
              <a-statistic title="NO:" :value="substance.no" suffix="μg/m3" />
            </a-space>
          </div>
          <div>
            <a-space :size="45">
              <a-statistic title="NO2:" :value="substance.no2" suffix="μg/m3" />
              <a-statistic title="O3:" :value="substance.o3" suffix="μg/m3" />
            </a-space>
          </div>
          <div>
            <a-space :size="45">
              <a-statistic title="SO2:" :value="substance.so2" suffix="μg/m3" />
              <a-statistic
                title="PM2_5:"
                :value="substance.pm2_5"
                suffix="μg/m3" />
            </a-space>
          </div>
          <div>
            <a-space :size="45">
              <a-statistic
                title="PM10:"
                :value="substance.pm10"
                suffix="μg/m3" />
              <a-statistic title="NH3:" :value="substance.nh3" suffix="μg/m3" />
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
            {{ substance }}
          </a-typography-title>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { Coord, Main, Weather, Wind, Sys } from '@types';

export default defineComponent({
  name: 'SearchBar',
  data: () => ({
    searchLocation: '',
    weather: {} as Weather,
    coord: {} as Coord,
    main: {} as Main,
    wind: {} as Wind,
    sys: {} as Sys,
    date: Number,
    substance: null,
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
