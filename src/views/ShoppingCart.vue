<template>
  <div>
    <page-header></page-header>
    <main class="main">
      <client-shopping-cart></client-shopping-cart>
    </main>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from "@/components/Client/PageHeader.vue";
import PageFooter from "@/components/Client/PageFooter.vue";
import ClientShoppingCart from "@/components/Client/ClientShoppingCart.vue";
export default {
  components: {
    PageHeader,
    PageFooter,
    ClientShoppingCart,
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background-color: #f5f3f1;
}
</style>