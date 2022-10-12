<template>
  <a-input-search
    type="text"
    v-model:value="searchLocation"
    placeholder="Search location..."
    enter-button="Search"
    size="large"
    @search="getLocation()" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  methods: {
    getLocation() {
      this.$parent.getLocation();
    },
  },
});
</script>
