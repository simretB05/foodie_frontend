<template>
  <div>
    <button class="remove_btn" @click="removeRestMenu" :menu_id="menu_id">
      Remove Menu
    </button>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  props: {
    menu_id: Number,
  },
  data() {
    return {
      token: Cookies.get(`restaurant_token`),
      menuArry: undefined,
    };
  },

  methods: {
    removeRestMenu(details) {
      let getMenuId = details[`target`].getAttribute(`menu_id`);
      let menuCard = details.target.closest(`.main-menu-card`);
      menuCard.remove();
      this.$root.$emit(`menuId`, getMenuId);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/menu`,

          method: `DELETE`,
          data: {
            menu_id: this.menu_id,
          },
        })
        .then((response) => {
          response;
          this.$emit("menu_deleted");
        })
        .catch((error) => {
          error;
          this.toastTitle = `error`;
          this.toastMessage = `"Invalid input! Please try again."`;
          this.showToast = true;
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.remove_btn {
  width: 70px;
  background-color: #dfe4de;
  border: none;
  border-radius: 15px;
  color: rgb(230, 70, 70);
  font-weight: 700;
  padding: 10px;
  transition: background-color 0.5s ease;
  box-shadow: 0 1px 0 #afcce7;
  margin: 16px;
}
.remove_btn:active {
  transform: translateY(3px);
  box-shadow: none;
}
</style>