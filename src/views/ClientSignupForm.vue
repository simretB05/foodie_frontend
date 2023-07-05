<template>
  <div>
    <page-header></page-header>
    <main class="main">
      <div class="main-card">
        <h2>Create a Foodie Account</h2>
        <client-signup-form></client-signup-form>
      </div>
    </main>
    <page-footer></page-footer>
  </div>
</template>
<script>
import PageHeader from "@/components/Client/PageHeader.vue";
import ClientSignupForm from "@/components/Client/ClientSignupForm.vue";
import PageFooter from "@/components/Client/PageFooter.vue";
export default {
  components: {
    PageHeader,
    ClientSignupForm,
    PageFooter,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background-color: #f5f3f1;
  display: grid;
  place-items: center;
}
.main-card {
  margin-top: 32px;
  width: 100%;
  display: grid;
  place-items: center;
  align-self: start;
}
</style>