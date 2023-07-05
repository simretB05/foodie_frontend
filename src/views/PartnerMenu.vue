<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <menu-input-page></menu-input-page>
    </main>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>

<script>
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
import MenuInputPage from "@/components/Restaurant/RestaurantMenuInputPage.vue";
export default {
  components: {
    MenuInputPage,
    BusinessPageHeader,
    BussinessPageFooter,
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background-color: #f1f2f4;
}
h1 {
  margin-top: 34px;
}
</style>