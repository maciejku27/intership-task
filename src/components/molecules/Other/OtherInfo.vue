<template>
  <a-card v-if="searchLocation != ''">
    <a-statistic title="Time" :value="changeTime(date)" />
  </a-card>
  <a-card v-else>
    <a-typography-title :level="4">
      Write a name of the country you want to check other information of in the
      search bar
    </a-typography-title>
  </a-card>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OtherInfo',
  props: ['searchLocation', 'date'],
  methods: {
    changeTime(time: number) {
      dayjs.unix(time).format;
    },
  },
});
</script>
