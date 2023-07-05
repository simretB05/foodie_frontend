<template>
  <div>
    <div class="main">
      <single-menu-item
        v-for="(menu, i) in menuArry"
        :key="i"
        :single_menu="menu"
      ></single-menu-item>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
import singleMenuItem from "@/components/Restaurant/singleMenuItem.vue";
export default {
  components: {
    singleMenuItem,
  },
  data() {
    return {
      get_resId: Cookies.get("restaurant_id"),
      menuArry: [],
    };
  },
  methods: {
    getItems() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/menu`,
          params: {
            restaurant_id: this.get_resId,
          },
        })
        .then((response) => {
          this.menuArry = response[`data`];
          this.$store.commit("setMenuData", this.menuArry);
        })
        .catch((error) => {
          error;
        });
    },
  },
  computed: {
    setMenuData() {
      return this.$store.state.menuData;
    },
  },
  mounted() {
    this.$root.$on("editeMenu", this.getItems);
    this.getItems();
  },
};
</script>
<style scoped>
.main {
  display: grid;
  place-items: center;
  width: 100%;
}
</style>