<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <div><h4>Name of resturant</h4></div>
      <restaurant-menu></restaurant-menu>
    </main>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>

<script>
import RestaurantMenu from "@/components/Restaurant/RestaurantMenu.vue";
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
export default {
  components: {
    RestaurantMenu,
    BusinessPageHeader,
    BussinessPageFooter,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.main {
  min-height: 80vh;
}
</style>