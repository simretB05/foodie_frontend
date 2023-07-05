<template>
  <div>
    <page-header></page-header>
    <main class="main">
      <client-orders></client-orders>
    </main>
    <page-footer></page-footer>
  </div>
</template>
<script>
import PageHeader from "@/components/Client/PageHeader.vue";
import PageFooter from "@/components/Client/PageFooter.vue";
import ClientOrders from "@/components/Client/ClientOrders.vue";
export default {
  components: {
    PageHeader,
    ClientOrders,
    PageFooter,
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
}
</style>