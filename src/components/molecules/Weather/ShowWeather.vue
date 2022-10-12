<template>
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
        <a-statistic title="Pressure:" :value="main.pressure" suffix="hPa" />
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
      </a-space>
    </div>
    <div>
      <a-space :size="45">
        <a-statistic title="Wind:" :value="wind.speed" suffix="m/s" />
        <a-statistic title="Humidity:" :value="main.humidity" suffix="%" />
      </a-space>
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

export default defineComponent({
  name: 'ShowWeather',
  props: ['searchLocation', 'weather', 'main', 'sys', 'wind', 'date'],
});
</script>
