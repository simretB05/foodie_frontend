<template>
  <div>
    <div class="menu_card">
      <label for=" menu item description">Menu item discription</label>
      <input
        ref="description"
        type="text"
        required
        placeholder="Item description"
      />
      <label for="menu item image">Menu item Image</label>
      <input type="text" ref="image_url" placeholder="Item Image" />
      <label for="menu item name">Menu item name</label>
      <input ref="name" type="text" required placeholder="Item name" />
      <label for="menu item price">Menu item price</label>
      <input ref="price" type="text" required placeholder="Item Price" />
      <button @click="updateMenu">Save Changes</button>
    </div>
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import TostMessage from "@/components/TostMessage.vue";

import axios from "axios";
export default {
  components: {
    TostMessage,
  },
  data() {
    return {
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
      token: Cookies.get(`restaurant_token`),
      menuData: [],
      patchedDataArray: [],
      menu_id: undefined,
    };
  },
  computed: {
    setMenuData() {
      return this.$store.state.menuData;
    },
  },
  mounted() {
    this.getPreviousData();
  },
  methods: {
    getPreviousData() {
      this.menuData = this.setMenuData;
      console.log(this.menuData);
      for (let i = 0; i < this.menuData.length; i++) {
        this.$refs[`name`].value = this.menuData[i][`name`];
        this.$refs[`description`].value = this.menuData[i][`description`];
        this.$refs[`image_url`].value = this.menuData[i][`image_url`];
        this.$refs[`price`].value = this.menuData[i][`price`];
        this.menu_id = this.menuData[i][`id`];
      }
    },
    updateMenu() {
      let patch_data = {
        name: this.$refs[`name`].value,
        description: this.$refs[`description`].value,
        image_url: this.$refs[`image_url`].value,
        price: this.$refs[`price`].value,
      };
      this.patchedDataArray.unshift(patch_data);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/menu`,
          headers: {
            token: this.token,
          },
          method: `PATCH`,
          data: {
            menu_id: this.menu_id,
            menu_data: patch_data,
          },
        })
        .then((response) => {
          response;
          this.toastTitle = `Success`;
          this.toastMessage = `successfully Edited  Your information`;
          this.showToast = true;
          this.$store.commit(`setMenuData`, patch_data);
          this.$root.$emit(`editeMenu`, patch_data);
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error.message;
          console.log(error);
          this.showToast = true;
          console.log(this.patchedDataArray);
        });
    },
  },
};
</script>
<style scoped>
h1 {
  margin-top: 32px;
}
.main {
  min-height: 30vh;
  margin: 32px;
}
.menu_card {
  display: grid;
  justify-items: center;
  width: 80%;
  margin: 32px auto;
  padding: 20px;
  background-color: #fcfcfb;
  border: 1px solid #7ed957;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
  justify-self: start;
  color: #7ed957;
}
input {
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #f5f3f1;
  font-size: 0.8rem;
  justify-self: start;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #7ed957;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
@media only screen and (min-width: 600px) {
  .menu_card {
    width: 50%;
  }
}
@media only screen and (min-width: 900px) {
  .menu_card {
    width: 50%;
  }
}
</style>