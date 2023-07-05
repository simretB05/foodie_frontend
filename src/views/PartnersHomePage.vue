<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <tost-message
        v-if="showToast"
        :title="toastTitle"
        :message="toastMessage"
      ></tost-message>

      <div>
        <h2>this is partners home page</h2>
      </div>
    </main>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
import TostMessage from "@/components/TostMessage.vue";
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
export default {
  components: {
    BusinessPageHeader,
    BussinessPageFooter,
    TostMessage,
  },
  data() {
    return {
      getRest_id: Cookies.get(`restaurant_id`),
      restData: undefined,
      restDataArry: [],
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    removeRestaurant(removed) {
      if (removed) {
        this.toastTitle = `Success`;
        this.toastMessage = `Successfully deleted  Your information`;
        this.showToast = true;
      } else {
        this.toastTitle = `Success`;
        this.toastMessage = `Successfully logged out`;
        this.showToast = true;
      }
    },
  },
  mounted() {
    if (this.getRest_id) {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant`,
          params: {
            restaurant_id: this.getRest_id,
          },
        })
        .then((response) => {
          Cookies.set(`rest_info`, response[`data`][0]);
          let restInfo_json = Cookies.get(`rest_info`);
          this.$root.$emit(`restData`, restInfo_json);
        })
        .catch((error) => {
          error;
        });
    } else {
      this.$root.$on("removed_rest", this.removeRestaurant);
      this.removeRestaurant();
    }
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
}
</style>