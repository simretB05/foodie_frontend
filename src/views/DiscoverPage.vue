<template>
  <div>
    <page-header></page-header>
    <main class="main">
      <h2 class="main-title">available restaurants near you</h2>
      <div class="restaurant_container">
        <div
          class="restauran-card"
          v-for="(restaurant, i) in getrestaurantsdata"
          :key="i"
        >
          <div class="restaurant-info">
            <p class="restaurant_name">{{ restaurant[`name`] }}</p>
            <p class="restaurant_phone">
              Phone-number: {{ restaurant[`phone_number`] }}
            </p>
            <p class="restaurant_address">
              Address: {{ restaurant[`address`] }}
            </p>
            <p class="restaurant_email">Email: {{ restaurant[`email`] }}</p>
            <p class="restaurant_bio">
              About-Restaurant: {{ restaurant[`bio`] }}
            </p>
            <p class="restaurant_city">Location: {{ restaurant[`city`] }}</p>
          </div>
          <div class="image-holder">
            <img
              class="profile-img"
              :src="restaurant[`profile_url`]"
              alt="profile image"
            />
            <img
              class="banner-img"
              :src="restaurant[`banner_url`]"
              alt="profile image"
            />
          </div>
          <button
            @click="getRestId"
            class="select_button"
            :restaurant_id="restaurant[`id`]"
          >
            select
          </button>
        </div>
      </div>
    </main>
    <page-footer></page-footer>
  </div>
</template>
<script>
import axios from "axios";
// import Cookies from "vue-cookies";
import PageHeader from "@/components/Client/PageHeader.vue";
import PageFooter from "@/components/Client/PageFooter.vue";
export default {
  components: {
    PageHeader,
    PageFooter,
  },
  data() {
    return {
      title: undefined,
      getRestaurant_id: undefined,
      getrestaurantsdata: [],
      rest_json: [],
    };
  },
  computed: {
    restaurantId() {
      return this.$store.state.restaurantId;
    },
  },
  methods: {
    getRestId(details) {
      let restaurantId = details[`target`].getAttribute(`restaurant_id`);
      this.$store.commit("setRestaurantId", restaurantId);
      this.$router.push(`single-restaurant-home`);
    },
    showRestaurants() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurants`,
        })
        .then((response) => {
          this.getrestaurantsdata = response[`data`];
        })
        .catch((error) => {
          error;
        });
    },
  },

  mounted() {
    this.showRestaurants();
  },
};
</script>

<style  scoped>
.main {
  min-height: 80vh;
  display: grid;
  place-items: center;
  background-color: #f5f3f1;
}
.main-title {
  margin: 30px;
  color: #7ed957;
  text-decoration: underline;
}
.restaurant_container {
  display: grid;
  place-items: center;
  align-self: start;
  gap: 16px;
  width: 90%;
}
.restauran-card {
  display: grid;
  place-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  min-height: 50vh;
  background-color: #f5f3f1;
}
.resturant-info {
  display: grid;
}
.image-holder {
  width: 90%;
  display: grid;
  gap: 16px;
  place-items: center;
}
.profile-img,
.banner-img {
  max-width: 90%;
  min-height: 90%;
  border-radius: 5px;
}
.restaurant-info {
  display: grid;
  place-items: center;
  padding: 20px;
  width: 70%;
}
.restaurant_name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #7ed957;
  justify-self: center;
}
.restaurant_phone,
.restaurant_address,
.restaurant_email,
.restaurant_bio,
.restaurant_city {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
}
.select_button {
  display: block;
  width: 30%;
  padding: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  background-color: #7ed957;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
}
@media only screen and (min-width: 600px) {
  .restaurant_container {
    width: 80%;
  }
}
@media only screen and (min-width: 900px) {
  .restaurant_container {
    width: 60%;
    /* grid-template-columns:repeat(auto-fit, minmax(380px, 1fr)); */
  }
  .restauran-card {
    width: 100%;
  }
  .restaurant-info {
    width: 88%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .image-holder {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    margin: 32px;
  }
  .select_button {
    width: 15%;
  }
}
</style>