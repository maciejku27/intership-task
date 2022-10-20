<template>
  <a-card v-if="isShown == true">
    <a-row>
      <a-col :span="23">
        <a-typography-text> {{ changeTime }} </a-typography-text>
      </a-col>
      <a-col :span="1">
        <img
          v-if="image"
          :key="image.id"
          @click="switchImage"
          class="image"
          :src="image.src"
          alt="image.alt" />
      </a-col>
    </a-row>
    <a-row>
      <a-typography-title :level="3">
        {{ weather.name }},{{ sys.country }}
        <img
          :src="`https://flagcdn.com/24x18/${
            sys.country?.toLowerCase() || 'aq'
          }.png`" />
      </a-typography-title>
    </a-row>
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
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default defineComponent({
  name: 'ShowWeather',
  props: ['weather', 'main', 'sys', 'wind', 'date', 'report', 'isShown'],
  data: () => ({
    index: 0,
    image: null,
    images: [
      {
        id: 0,
        src: 'unfavorite.png',
        alt: 'star hollow',
      },
      {
        id: 1,
        src: 'favorite.png',
        alt: 'star filled',
      },
    ],
  }),
  mounted() {
    this.switchImage();
  },
  computed: {
    changeTime() {
      const changedDate = dayjs
        .unix(this.weather.dt + this.weather.timezone)
        .utc()
        .locale('en')
        .format('DD MMM, HH:mm');
      return changedDate;
    },
  },
  methods: {
    switchImage() {
      this.image = this.images[this.index];
      this.index = (this.index + 1) % this.images.length;
    },
  },
});
</script>

<style>
.image {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: filter 0.3s ease-in;
}

.image:hover {
  filter: brightness(1.2);
}
</style>
