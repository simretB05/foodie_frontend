<template>
  <div>
    <main class="main">
      <h1>Create And Save Your Restaurant Menu</h1>
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
        <button @click="saveMenu">Save</button>
      </div>
      <tost-message
        v-if="showToast"
        :title="toastTitle"
        :message="toastMessage"
      ></tost-message>
    </main>
    <div>
      <show-resturan-menu></show-resturan-menu>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
import ShowResturanMenu from "@/components/Restaurant/ShowResturanMenu.vue";
import TostMessage from "@/components/TostMessage.vue";
export default {
  components: {
    ShowResturanMenu,
    TostMessage,
  },
  data() {
    return {
      restaurant_token: Cookies.get(`restaurant_token`),
      succsses_message: undefined,
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    saveMenu() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/menu`,
          method: `POST`,
          headers: {
            token: this.restaurant_token,
          },
          data: {
            name: this.$refs[`name`].value,
            description: this.$refs[`description`].value,
            image_url: this.$refs[`image_url`].value,
            price: this.$refs[`price`].value,
          },
        })
        .then(() => {
          this.toastTitle = `Success`;
          this.toastMessage = `successfully posted a new menu`;
          this.showToast = true;
          this.$root.$emit("added_menu");
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error[`response`][`data`];
          this.showToast = true;
        });
    },
  },
  mounted() {},
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
  width: 50%;
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
  button {
    width: 40%;
  }
}
@media only screen and (min-width: 900px) {
  .menu_card {
    width: 50%;
  }
  button {
    width: 20%;
  }
}
</style>