<template>
  <div>
    <business-page-header></business-page-header>
    <div class="main-section">
      <get-resturant-in-profile-vue></get-resturant-in-profile-vue>
    </div>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>

<script>
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
import GetResturantInProfileVue from "@/components/Restaurant/GetResturantInProfile.vue";
export default {
  components: {
    BusinessPageHeader,
    BussinessPageFooter,
    GetResturantInProfileVue,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.main-section {
  min-height: 80vh;
}
</style>