<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <h2>Create a Partner Foodie Account</h2>
      <business-signup-form></business-signup-form>
    </main>
    <business-page-footer></business-page-footer>
  </div>
</template>

<script>
import BusinessSignupForm from "@/components/Restaurant/BusinessSignupForm.vue";
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BusinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
export default {
  components: {
    BusinessSignupForm,
    BusinessPageHeader,
    BusinessPageFooter,
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  display: grid;
  place-items: center;
}
</style>