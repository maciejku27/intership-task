<template>
  <Container :size="md">
    <a-typography-title>Todays Weather</a-typography-title>
    <SearchBar />
    <BarChart />
  </Container>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
//#endregion
//#region internal
import { $http } from '@services/http.service';
import Container from '@components/atoms/Container/Container.vue';
import { basePath } from '@paths/base.path';
import SearchBar from '@components/molecules/Search/SearchBar.vue';
import BarChart from '@components/atoms/Chart/BarChart.vue';
//#endregion

export default defineComponent({
  name: 'HomePage',
  components: { Container, SearchBar, BarChart },
  setup() {
    const { t } = useI18n();
    const city = 'London';
    const limit = 5;
    $http.get(basePath.api + '/geo/1.0/direct', {
      params: {
        q: city,
        limit,
      },
    });

    return { t };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';
</style>
