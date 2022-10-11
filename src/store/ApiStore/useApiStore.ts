import { defineStore } from 'pinia';
import { Coord, Main, Weather, Wind, Sys } from '@types';
import axios from 'axios';

export const useApiStore = defineStore('ApiStore', {
  state: () => ({
    weather: {} as Weather,
    coord: {} as Coord,
    main: {} as Main,
    wind: {} as Wind,
    sys: {} as Sys,
    date: Number,
    substance: null,
    air: null,
  }),
  actions: {
    async getLocation(searchLocation: '') {
      await axios
        .get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: searchLocation,
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
