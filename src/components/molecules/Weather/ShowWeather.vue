<template>
  <a-card v-if="isShown == true">
    <a-row>
      <a-col :span="23">
        <a-typography-text> {{ changeTime }} </a-typography-text>
      </a-col>
      <a-col :span="1">
        <img
          v-if="checkFavourite(weather.name) == false"
          @click="addFavourite(weather.name, coord.lat, coord.lon)"
          class="image"
          src="unfavorite.png"
          alt="image.alt" />
        <img
          v-else-if="checkFavourite(weather.name) == true"
          @click="deleteFavourite(weather.name)"
          class="image"
          src="favorite.png"
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
        {{ main.temp.toFixed(0) }}°C
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
    <a-row justify="center">
      <a-typography-title :level="4">
        Write a name of the country you want to check weather of in the search
        bar
      </a-typography-title>
    </a-row>
    <a-row justify="center">
      <a-typography-title :level="4"> or </a-typography-title>
    </a-row>
    <a-row justify="center">
      <a-button type="primary" @click="locateMe">
        use your current location
      </a-button>
    </a-row>
    <a-row justify="center">
      <div v-if="errorStr">
        Sorry, but the following error occurred: {{ errorStr }}
      </div>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useFavouritesStore } from '@store/useFavouritesStore';

dayjs.extend(utc);

export default defineComponent({
  name: 'ShowWeather',
  props: [
    'weather',
    'main',
    'sys',
    'wind',
    'date',
    'report',
    'isShown',
    'coord',
  ],
  data: () => ({
    //TODO: change to correct types
    index: 0,
    location: null,
    gettingLocation: false,
    errorStr: '',
  }),
  setup() {
    const store = useFavouritesStore();

    return { store };
  },
  mounted() {
    this.getPosition();
  },
  updated() {
    this.checkFavourite(this.weather.name);
    console.log(this.checkFavourite(this.weather.name));
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
    addFavourite(item: string, lat: number, lon: number) {
      if (item.length === 0) {
        return;
      }
      this.store.addFavourite(item, lat, lon);
    },
    deleteFavourite(item: string) {
      this.store.deleteFavourite(item);
    },
    checkFavourite(item: string) {
      return this.store.checkFavourite(item);
    },
    getPosition() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      try {
        this.location = await this.getPosition();
        this.getLocation(this.location);
      } catch (e) {
        this.errorStr = e.message;
      }
    },
    getLocation(location) {
      this.$emit('event', location.coords.latitude, location.coords.longitude);
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
