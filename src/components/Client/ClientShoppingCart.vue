<template>
  <div>
    <div class="main">
      <h1 class="orders_title">Your Foodie Cart</h1>
      <div class="orders_card" v-for="(order, i) in orderArray" :key="i">
        <div>
          <h2 class="order_name">{{ order[`name`] }}</h2>
          <p class="order_price">Price {{ order[`price`] }} $CAD</p>
          <div class="confirm-card">
            <p class="order_confirm">{{ order[`is_complete`] }}</p>
            <p class="orders_confirm">{{ order[`is_confirmed`] }}</p>
          </div>
          <button
            @click="sendOrder"
            :order_id="order[`id`]"
            class="select_button"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  data() {
    return {
      orderArray: Cookies.get(`orderData`),
      clientId: Cookies.get(`client_id`),
      token: Cookies.get(`token`),
      orderIDArray: [],
    };
  },
  mounted() {},
  methods: {
    sendOrder(details) {
      let order_id = details[`target`].getAttribute(`order_id`);
      this.orderIDArray.unshift(order_id);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/client-order`,
          method: `POST`,
          data: {
            client_id: this.clientId,
            restaurant_id: this.restaurantId,
            menu_id: this.orderIDArray,
          },
        })
        .then((response) => {
          response;
          this.$router.push(`/client-orders`);
        })
        .catch((error) => {
          error;
        });
    },
  },
  computed: {
    restaurantId() {
      return this.$store.state.restaurantId;
    },
  },
};
</script>

<style scoped>
.main {
  display: grid;
  place-items: center;
}
.orders_title {
  margin-top: 50px;
}
.orders_card {
  display: grid;
  place-items: center;
  width: 90%;
  min-height: 10vh;
  border: 1px solid #f0ebeb;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
}
.order_name {
  font-size: 1rem;
  font-weight: bold;
}

.order_id,
.order_price {
  display: grid;
  place-items: center;
  color: black;
  margin: 15px;
  justify-self: start;
}
.order_price {
  color: #7ed957;
  font-weight: 700;
}
.confirm-card {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.order_confirm,
.orders_confirm {
  margin-right: 10px;
}

.select_button {
  width: 160px;
  background-color: #7ed957;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: 700;
  padding: 10px;
  transition: background-color 0.5s ease;
  box-shadow: 0 1px 0 #afcce7;
  margin: 16px;
}
.select_button:active {
  transform: translateY(3px);
  box-shadow: none;
}
@media only screen and (min-width: 600px) {
  .orders_card {
    width: 80%;
  }
}
@media only screen and (min-width: 900px) {
  .orders_card {
    width: 30%;
  }
}
</style>