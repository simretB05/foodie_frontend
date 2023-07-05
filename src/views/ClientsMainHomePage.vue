<template>
  <div>
    <page-header></page-header>
    <div class="main">
      <tost-message
        v-if="showToast"
        :title="toastTitle"
        :message="toastMessage"
      ></tost-message>
      <div class="card">
        <h1>wellcome to Foodie</h1>
      </div>
    </div>
    <page-footer></page-footer>
  </div>
</template>
<script>
import TostMessage from "@/components/TostMessage.vue";
import axios from "axios";
import Cookies from "vue-cookies";
import PageHeader from "@/components/Client/PageHeader.vue";
import PageFooter from "@/components/Client/PageFooter.vue";
export default {
  components: {
    PageHeader,
    PageFooter,
    TostMessage,
  },
  data() {
    return {
      getClient_id: Cookies.get(`client_id`),
      userData: undefined,
      userDataArry: [],
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    removeClient(removed) {
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
    if (this.getClient_id) {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/client`,

          params: {
            client_id: this.getClient_id,
          },
        })
        .then((response) => {
          Cookies.set(`client_info`, response[`data`][0]);
          let clientInfo_json = Cookies.get(`client_info`);
          this.$root.$emit(`userData`, clientInfo_json);
        })
        .catch((error) => {
          error;
        });
    } else {
      this.removeClient();
      this.$root.$on("removed", this.removeClient);
    }
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background-color: #f1f2f4;
}
.card {
  display: grid;
  place-items: center;
}
h1 {
  margin: 32px;
}
</style>