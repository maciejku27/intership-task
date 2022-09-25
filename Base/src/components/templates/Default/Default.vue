<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-row :gutter="24">
        <a-col>
          <CImage src="/public/logo.png" class="logo" :href="home" />
        </a-col>
        <a-col>
          <a-menu
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }">
            <a-menu-item key="home" @click="handleHome">Home</a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <component :is="Component"></component>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </a-layout-content>

    <a-layout-footer class="footer">
      <router-link :to="policyPage" class="policy">
        {{ t('components.defaultTemplate.policy') }}
      </router-link>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
//#endregion
//#region internal
import { pagePath } from '@paths/page.path';
import CImage from '@components/atoms/Image/Image.vue';
import { useRouter } from 'vue-router';
//#endregion

export default defineComponent({
  name: 'DefaultTemplate',
  components: { CImage },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const handleHome = () => {
      router.push(pagePath.home.pathname);
    };

    return { t, handleHome };
  },
  data() {
    return {
      policyPage: pagePath.policy.pathname,
      home: pagePath.home.pathname,
    };
  },
});
</script>
<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';

.layout {
  min-height: 100vh;
}

.logo {
  height: 36px;
}
</style>
