<template>
  <a-card v-if="0 == 0">
    <a-space direction="vertical">
      <a-typography-text> {{ changeTime }} </a-typography-text>
      <a-typography-title :level="3">
        {{ weather.name }},{{ sys.country }}
        <img
          :src="`https://flagcdn.com/24x18/${
            sys.country.toLowerCase() || 'aq'
          }.png`" />
      </a-typography-title>
    </a-space>
    <div>
      <a-typography-title>
        <a-popover>
          <template v-slot:content>
            {{ report.description }}
          </template>
          <img
            :src="`http://openweathermap.org/img/w/${
              report.icon || '03d'
            }.png`" />
        </a-popover>
        {{ main.temp }}°C
      </a-typography-title>
    </div>
    <div>
      <a-row>
        <a-col :span="14">
          <a-statistic title="Pressure:" :value="main.pressure" suffix="hPa" />
        </a-col>
        <a-col :span="36">
          <span v-if="weather.visibility >= 9000">
            <a-statistic title="Visibility:" :value="'Good'" />
          </span>
          <span v-if="weather.visibility < 9000 && weather.visibility >= 4000">
            <a-statistic title="Visibility:" :value="'Moderate'" />
          </span>
          <span v-if="weather.visibility < 4000 && weather.visibility >= 1500">
            <a-statistic title="Visibility:" :value="'Poor'" />
          </span>
          <span v-if="weather.visibility < 1500 && weather.visibility >= 0">
            <a-statistic title="Visibility:" :value="'Very Poor'" />
          </span>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col :span="14">
          <a-statistic title="Wind:" :value="wind.speed" suffix="m/s" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="Humidity:" :value="main.humidity" suffix="%" />
        </a-col>
      </a-row>
    </div>
  </a-card>
  <a-card v-else>
    <a-typography-title :level="4">
      Write a name of the country you want to check weather of in the search bar
    </a-typography-title>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'ShowWeather',
  props: ['weather', 'main', 'sys', 'wind', 'date', 'report'],
  computed: {
    changeTime() {
      const changedDate = dayjs.unix(this.weather.dt).format('DD MMM, HH:mm');
      return changedDate;
    },
  },
});
</script>
