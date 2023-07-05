<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <restaurant-side-orders></restaurant-side-orders>
    </main>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>
<script>
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
import RestaurantSideOrders from "@/components/Restaurant/RestaurantSideOrders.vue";
export default {
  components: {
    BusinessPageHeader,
    RestaurantSideOrders,
    BussinessPageFooter,
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  width: 100%;
  display: grid;
  place-items: center;
}
</style>