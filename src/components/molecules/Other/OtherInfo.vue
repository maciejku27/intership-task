<template>
  <a-card v-if="0 == 0">aa </a-card>
  <a-card v-else>
    <a-typography-title :level="4">
      Write a name of the country you want to check other information of in the
      search bar
    </a-typography-title>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OtherInfo',
  props: ['searchLocation', 'weather'],
});
</script>
