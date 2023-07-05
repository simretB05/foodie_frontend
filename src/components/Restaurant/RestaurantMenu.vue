<template>
  <main class="main">
    <div class="rest_info_card">
      <h1 class="rest_name">{{ restaurant_name }} Restaurant Menu</h1>
      <p class="rest_address">Address:{{ restaurant_address }}</p>
      <p class="rest_address">Phone-number:{{ restaurant_phone }}</p>
    </div>
    <div class="main_card">
      <div class="menu_container">
        <div class="menu_card" v-for="(menu, i) in menuArry" :key="i">
          <div class="menu_img_card">
            <img class="menu_image" :src="menu[`image_url`]" alt="" />
          </div>
          <div class="menu_details">
            <h3 class="menu_name">{{ menu[`name`] }}</h3>
            <p class="menu_description">{{ menu[`description`] }}</p>
            <p class="menu_price">{{ menu[`price`] }}$CAD</p>

            <div v-if="token">
              <label class="order_label" for="number"> Number Of Order</label>
              <input
                type="number"
                class="order_number"
                placeholder="number"
                min="1"
                max="100"
              />
              <button
                @click="addtoCart"
                :menu_id="menu[`id`]"
                class="addto_cart"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";

export default {
  props: {
    restaurant_id: Number,
  },
  data() {
    return {
      menuArry: [],
      restaurant_name: undefined,
      restaurant_address: undefined,
      restaurant_phone: undefined,
      token: Cookies.get(`token`),

      orderArray: [],
    };
  },
  methods: {
    processApiCall() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/menu`,
          params: {
            restaurant_id: this.restaurantId,
          },
        })
        .then((response) => {
          let data = response.data;
          this.menuArry = data;
          this.restaurant_name = data[1][`restaurant_name`];
          this.restaurant_address = data[1][`address`];
          this.restaurant_phone = data[1][`phone_number`];
        })
        .catch((error) => {
          error;
        });
    },
    addtoCart(details) {
      let menu_id = details[`target`].getAttribute(`menu_id`);
      for (let i = 0; i < this.menuArry.length; i++) {
        if (String(this.menuArry[i][`id`]) === menu_id) {
          this.orderArray.push(this.menuArry[i]);
          Cookies.set(`orderData`, this.orderArray);
          break;
        }
      }
    },
  },
  computed: {
    restaurantId() {
      return this.$store.state.restaurantId;
    },
  },
  mounted() {
    this.processApiCall();
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
}
.main_card {
  display: grid;
  place-items: center;
  width: 100%;
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
  border-radius: 10px 0 0 10px;
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

@media only screen and (min-width: 600px) {
  .menu_card {
    width: 70%;
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
  }
  .menu_container {
    width: 60%;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
}
</style>