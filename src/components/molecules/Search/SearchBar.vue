<template>
  <div class="global-search-wrapper">
    <a-auto-complete
      v-model:value="searchLocation"
      :dropdown-match-select-width="252"
      style="width: 450px"
      :options="geol"
      @search="getGeo()">
      <template #option="item">
        <div
          style="display: flex; justify-content: space-between"
          @click="getLocation(item.lat, item.lon), (searchLocation = '')">
          <span>
            {{ item.name }}, {{ item.country }}
            <img
              :src="`https://flagcdn.com/16x12/${
                item.country?.toLowerCase() || 'aq'
              }.png`" />
          </span>
          <span> {{ item.lat.toFixed(2) }}, {{ item.lon.toFixed(2) }}</span>
        </div>
      </template>
      <a-input-search
        style="width: 500px"
        size="large"
        placeholder="Search location..."
        enter-button></a-input-search>
    </a-auto-complete>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export default defineComponent({
  name: 'SearchBar',
  props: ['weather'],
  setup() {
    const searchLocation = ref('');
    const geol = ref([]);

    return {
      searchLocation,
      geol,
    };
  },
  created() {
    this.getGeo = _.debounce(this.getGeo, 600);
  },
  methods: {
    getGeo() {
      axios
        .get('http://api.openweathermap.org/geo/1.0/direct', {
          params: {
            q: this.searchLocation,
            limit: 5,
            appid: '67cd127ea4ab6b435f50093b78e4d4d6',
          },
        })
        .then((response) => {
          this.geol = response.data;
        });
    },
    getLocation(lat: number, lon: number) {
      this.$emit('event', lat, lon);
    },
  },
});
</script>
