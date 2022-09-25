<template>
  <Container size="md">
    <a-typography-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, ullam
      sequi. Error fugiat, voluptatem rerum natus incidunt enim harum odit animi
      eaque libero facere voluptatibus quis beatae. Rerum, mollitia vitae? Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Quidem at totam
      distinctio adipisci! Aperiam sit exercitationem suscipit? Debitis iste
      voluptatum, excepturi itaque maiores exercitationem tenetur ratione porro
      doloribus voluptatibus, nobis odio obcaecati at similique minima adipisci
      dolore id eos aperiam accusamus? Minima officiis totam ex expedita id
      impedit dolorum similique earum tempora. Provident magnam expedita quod
      natus voluptatem fuga ipsam praesentium modi sint amet iusto labore,
      molestias cupiditate nesciunt ducimus sunt unde voluptatum commodi
      explicabo distinctio quasi corrupti delectus laboriosam itaque. Soluta
      delectus maxime mollitia, rerum minus ab nisi alias ullam, qui ducimus
      deleniti adipisci, autem error amet ut. Similique quam autem unde odit
      officiis delectus aperiam sit asperiores. Fuga maiores voluptatibus qui
      aliquam nesciunt ullam porro eius repudiandae odio, suscipit quibusdam,
      consequuntur, labore minima in voluptas voluptates nobis. Asperiores,
      tempore exercitationem! Suscipit eius eveniet sapiente sint quam, ut dicta
      officia temporibus ratione optio. Error atque natus neque dicta
      reprehenderit alias nihil saepe. Ipsum neque quia nam doloribus veritatis
      sequi, facere sapiente facilis voluptatem sint possimus beatae quidem
      commodi officia saepe eveniet quasi vitae nulla eos! Facere totam,
      cupiditate, natus error quae eaque dolorum, eos fugit consectetur vitae
      voluptatem blanditiis possimus qui magnam! Cupiditate, hic voluptatibus
      commodi dolor modi, accusamus, vero ut error ex quam id! Similique
      deserunt reiciendis, alias praesentium laudantium architecto minus?
      Voluptate ipsum ut sint corrupti in vero molestiae illo, sed, dolorum
      dignissimos officiis voluptates harum earum deserunt? Tempore voluptates,
      provident deleniti dolor consequatur voluptas facilis magni adipisci?
      Officia cupiditate vero doloribus, temporibus alias debitis sunt at rem
      maiores aspernatur expedita nemo suscipit necessitatibus dicta tenetur
      consectetur repudiandae animi natus ipsum. Sequi, consequatur iste illo,
      vitae modi labore enim sunt dignissimos odio quod aliquam iure tenetur
      obcaecati quas, quam explicabo? Veniam expedita explicabo odit dolorum
      eveniet est sit, dignissimos illo eligendi officia, provident molestias
      fugit animi officiis.
    </a-typography-text>
  </Container>
</template>

<script lang="ts">
//#region vendor
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
//#endregion
//#region internal
import { pagePath } from '@paths/page.path';
import Container from '@components/atoms/Container/Container.vue';
//#endregion

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Page404',
  components: { Container },
  setup() {
    const { t } = useI18n();

    return { t };
  },
  data() {
    return {
      home: pagePath.home.pathname,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@styles/base/variables.less';
@import '@styles/base/mixins.less';
</style>
