<template>
  <div class="main-menu-card">
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>

    <div class="main_card">
      <div class="menu_card">
        <div class="menu_img_card">
          <img
            class="menu_image"
            :src="single_menu[`image_url`]"
            alt="food image"
          />
        </div>
        <div class="menu_details">
          <h3 class="menu_name">Name: {{ single_menu[`name`] }}</h3>
          <p class="menu_description">
            Description: {{ single_menu[`description`] }}
          </p>
          <p class="menu_price">Price: {{ single_menu[`price`] }}$CAD</p>
          <div class="btn">
            <button @click="OpenEditForm" class="edit_btn">Edit Menu</button>
            <remove-menu :menu_id="single_menu.id"></remove-menu>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-card" v-if="is_edit">
      <edit-resturant-menu :menu_id="single_menu.id"></edit-resturant-menu>
    </div>
  </div>
</template>

<script>
import TostMessage from "@/components/TostMessage.vue";
import RemoveMenu from "@/components/Restaurant/RemoveMenu.vue";
import EditResturantMenu from "@/components/Restaurant/EditResturantMenu.vue";
export default {
  components: {
    TostMessage,
    RemoveMenu,
    EditResturantMenu,
  },
  props: {
    single_menu: Object,
  },
  data() {
    return {
      is_edit: false,
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
      menudata: undefined,
    };
  },
  computed: {
    setMenuData() {
      return this.$store.state.menuData;
    },
  },
  methods: {
    OpenEditForm() {
      this.is_edit = !this.is_edit;
    },
  },

  mounted() {
    this.$root.$on(`editeMenu`, (patch_data) => (this.menudata = patch_data));
  },
};
</script>

<style scoped>
.rest_name {
}
.rest_address {
  font: 1rem;
}
.main {
  min-height: 30vh;
  margin: 32px;
  width: 40%;
}
.main_card {
  display: grid;
  place-items: center;
  width: 100%;
  gap: 20px;
  margin-top: 30px;
}
.menu_container {
  display: grid;
  place-items: center;
  width: 100%;
  justify-content: center;
  gap: 20px;
  margin: 50px;
}
.menu_card {
  width: 80%;
  background-color: #fff;
  display: grid;
  place-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.menu_img_card {
  width: 100%;
  min-height: 100%;
  align-self: start;
}
.menu_image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
  align-self: start;
}
.menu_details {
  padding: 14px;
  display: grid;
  place-items: center;
  min-height: 25vh;
  width: 90%;
}
.menu_name {
  font-size: 0.91rem;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%;
}
.menu_description {
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #787676;
}
.menu_price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.order_label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.8rem;
  padding: 10px;
}

.order_number {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
  margin-bottom: 10px;
}
.addto_cart {
  display: block;
  width: 60%;
  padding: 10px 0;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  background-color: #7ed957;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.btn {
  display: grid;
  place-items: center;
}
.edit_btn {
  width: 80px;
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
.edit_btn:active {
  transform: translateY(3px);
  box-shadow: none;
}

.edit-card {
  width: 100%;
}
@media only screen and (min-width: 600px) {
  .menu_card {
    width: 70%;
    margin-top: 30px;
  }
  .menu_details {
    min-height: 23vh;
    width: 68%;
  }
  .menu_name {
    font-size: 1rem;
  }
  .menu_description {
    font-size: 1rem;
  }
  .addto_order {
    width: 70%;
  }
}
@media only screen and (min-width: 900px) {
  .main_card {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }
  .menu_card {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .menu_container {
    width: 60%;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
  .btn {
    width: 70%;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    gap: 40px;
  }
}
</style>