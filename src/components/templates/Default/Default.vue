<template>
  <a-layout class="layout">
    <a-layout>
      <a-layout-header class="header">
        <a-row :gutter="24">
          <a-col flex="84px">
            <CImage src="/public/logo.png" class="logo" :href="home" />
          </a-col>
          <a-col flex="auto">
            <a-menu theme="dark" mode="horizontal">
              <a-menu-item key="home" @click="handleHome">Home</a-menu-item>
              <!-- <a-menu-item key="helloWorld" @click="handleHelloWorld">
              Hello World
            </a-menu-item> -->
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
                  <Container size="lg">
                    <component :is="Component"></component>
                  </Container>
                </Suspense>
              </KeepAlive>
            </Transition>
          </template>
        </RouterView>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a-typography-text strong>Made with ❤ and 🍕</a-typography-text>
      </a-layout-footer>
    </a-layout>
    <a-layout-sider class="siderMenu" v-model:collapsed="collapsed" collapsible>
      <a-menu
        class="siderTitle"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark">
        <a-sub-menu key="sub1" style="padding-top: 12px">
          <template #title>
            <div>
              <a-row type="flex" style="padding-bottom: 10px">
                <a-col :span="6">
                  <img src="favorite.png" style="width: 28px; height: 28px" />
                </a-col>
                <a-col :span="4">
                  <a-typography-text
                    v-if="collapsed == false"
                    class="favourite">
                    Favourites
                  </a-typography-text>
                </a-col>
              </a-row>
            </div>
          </template>
          <a-menu-item key="1">Warsaw</a-menu-item>
          <a-menu-item key="2">Tokyo</a-menu-item>
          <a-menu-item key="3">Miami</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
//#region vendor
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
//#endregion
//#region internal
import { pagePath } from '@paths/page.path';
import CImage from '@components/atoms/Image/Image.vue';
import Container from '@components/atoms/Container/Container.vue';
//#endregion

export default defineComponent({
  name: 'DefaultTemplate',
  components: { CImage, Container },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const handleHome = () => {
      router.push(pagePath.home.pathname);
    };
    const handleHelloWorld = () => {
      router.push(pagePath.helloWorld.pathname);
    };

    return { t, handleHome, handleHelloWorld };
  },
  data() {
    return {
      home: pagePath.home.pathname,
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
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

.footer {
  display: flex;
  justify-content: center;
}

.header {
  outline-style: solid;
  outline-color: rgb(11, 148, 238);
}

.siderMenu {
  outline-style: solid;
  outline-color: rgb(11, 148, 238);
}

.siderTitle {
  height: 64px;
  outline-style: solid;
  outline-color: rgb(11, 148, 238);
}

.favourite {
  font-size: 130%;
  color: rgba(255, 255, 255, 0.65);
}
</style>
