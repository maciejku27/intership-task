<template>
  <a-card v-if="isShown == true">
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
      <a-row>
        <a-col :span="12">
          <a-statistic title="CO:" :value="substance.co" suffix="μg/m3" />
        </a-col>
        <a-col :span="10">
          <a-statistic title="NO:" :value="substance.no" suffix="μg/m3" />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col :span="12">
          <a-statistic title="NO2:" :value="substance.no2" suffix="μg/m3" />
        </a-col>
        <a-col :span="10">
          <a-statistic title="O3:" :value="substance.o3" suffix="μg/m3" />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col :span="12">
          <a-statistic title="SO2:" :value="substance.so2" suffix="μg/m3" />
        </a-col>
        <a-col :span="10">
          <a-statistic title="PM2_5:" :value="substance.pm2_5" suffix="μg/m3" />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col :span="12">
          <a-statistic title="PM10:" :value="substance.pm10" suffix="μg/m3" />
        </a-col>
        <a-col :span="10">
          <a-statistic title="NH3:" :value="substance.nh3" suffix="μg/m3" />
        </a-col>
      </a-row>
    </div>
  </a-card>
  <a-card v-else>
    <a-typography-title :level="4">
      Write a name of the country you want to check air quality of in the search
      bar
    </a-typography-title>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AirPollution',
  props: ['air', 'substance', 'isShown'],
});
</script>
