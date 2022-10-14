<template>
  <Container :size="md">
    <a-typography-title>Todays Weather</a-typography-title>
    <WeatherReport />
  </Container>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
//#endregion
//#region internal
import Container from '@components/atoms/Container/Container.vue';
import WeatherReport from '@components/organisms/WeatherReport/WeatherReport.vue';
//#endregion

export default defineComponent({
  name: 'HomePage',
  components: { Container, WeatherReport },
  setup() {
    const { t } = useI18n();

    return { t };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';
</style>
