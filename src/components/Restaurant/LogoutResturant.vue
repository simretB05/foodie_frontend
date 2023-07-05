<template>
  <div>
    <button class="desktoplogout_btn" @click="logoutHandler">Logout</button>
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  data() {
    return {
      token: Cookies.get("restaurant_token"),
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    logoutHandler() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-logout`,
          method: `DELETE`,
          data: {
            token: this.token,
          },
        })
        .then(() => {
          Cookies.remove(`restaurant_id`);
          Cookies.remove(`rest_info`);
          Cookies.remove(`restaurant_token`);
          this.$root.$emit("logout_rest");
          this.$router.push(`/partner-home`);
        })
        .catch((error) => {
          error;
          this.toastTitle = `error`;
          this.toastMessage = `"Invalid input! Please try again."`;
          this.showToast = true;
        });
    },
  },
};
</script>

<style scoped>
.logout_btn,
.desktoplogout_btn {
  justify-self: start;
  background-color: #7ed957;
  width: 100px;
  padding: 8px;
  border: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  color: white;
}
</style>