<template>
  <div>
    <business-page-header></business-page-header>
    <main class="main">
      <h2 class="main-title">this is where you find restaurans</h2>
      <div class="restaurant_container">
        <div class="resturan-card" v-for="(rest, i) in responseData" :key="i">
          <div class="restaurant_info">
            <p class="restaurant_name">{{ rest[`name`] }}</p>
            <p class="restaurant_phone">
              Phone-number: {{ rest[`phone_number`] }}
            </p>
            <p class="restaurant_address">Address: {{ rest[`address`] }}</p>
            <p class="restaurant_email">Email: {{ rest[`email`] }}</p>
            <p class="restaurant_bio">About-Restaurant: {{ rest[`bio`] }}</p>
            <p class="restaurant_city">Location:{{ rest[`city`] }}</p>
          </div>
          <div class="image_holder">
            <img
              class="profile-img"
              :src="rest[`profile_url`]"
              alt="profile image"
            />
            <img
              class="banner-img"
              :src="rest[`banner_url`]"
              alt="profile image"
            />
          </div>
          <button
            class="select_button"
            @click="selectRestaurant"
            :restaurant_id="rest[`id`]"
          >
            select
          </button>
        </div>
      </div>
    </main>
    <bussiness-page-footer></bussiness-page-footer>
  </div>
</template>
<script>
import axios from "axios";
import BusinessPageHeader from "@/components/Restaurant/BusinessPageHeader.vue";
import BussinessPageFooter from "@/components/Restaurant/BussinessPageFooter.vue";
export default {
  components: {
    BusinessPageHeader,
    BussinessPageFooter,
  },
  data() {
    return {
      resturants: [],
      getrestaurantsData: undefined,
      responseData: undefined,
    };
  },
  methods: {
    selectRestaurant(details) {
      let getRestaurant_id = details[`target`].getAttribute(`restaurant_id`);
      this.$store.commit("setRestaurantId", getRestaurant_id);
      this.$router.push(`single-partner-home`);
    },
    getRsturants() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurants`,
        })
        .then((response) => {
          this.responseData = response[`data`];
          this.$root.$emit(`restData`, this.responseData);
        })
        .catch((error) => {
          error;
        });
    },
  },
  mounted() {
    this.getRsturants();
  },
  computed: {
    restaurantId() {
      return this.$store.state.restaurantId;
    },
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
}

.restaurant_info {
  display: grid;
}

.image_holder {
  width: 100%;
  display: grid;
  gap: 16px;
  place-items: center;
}

.profile-img,
.banner-img {
  max-width: 100%;
  max-height: 100%;
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

  .restaurant_info {
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media only screen and (min-width: 900px) {
  .restaurant_container {
    width: 100%;
  }

  .image_holder {
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }

  .restaurant_info {
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .select_button {
    width: 15%;
  }
}
</style>