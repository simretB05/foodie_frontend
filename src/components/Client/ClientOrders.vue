<template>
  <div class="main">
    <h1 class="orders_title">Your Orders</h1>
    <div class="orders_card" v-for="(order, i) in orders" :key="i">
      <h2 class="order_name">{{ order[`name`] }}</h2>
      <p class="order_price">Price {{ order[`price`] }} $CAD</p>
      <p class="order_id">your Order Number {{ order[`order_id`] }}</p>
      <div class="confirm-card">
        <p class="order_complete" v-if="order[`is_complete`]">
          Your Order is Complete
        </p>
        <p class="order_confirm" v-else-if="order[`is_confirmed`]">
          Your Order is Confirmed
        </p>
        <p class="order_confirmNot" v-else>Your Order is NOT Confirmed</p>
      </div>
      <button class="select_button">ReOrder</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  data() {
    return {
      token: Cookies.get(`token`),
      orders: [],
    };
  },
  methods: {
    getOrders() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/client-all-order`,
          headers: {
            token: this.token,
          },
          params: {
            is_complete: 1,
            is_confirmed: 1,
          },
        })
        .then((response) => {
          this.orders = response[`data`];
        })
        .catch((error) => {
          error;
        });
    },
    countOrders() {},
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style scoped>
.main {
  display: grid;
  place-items: center;
}
h1 {
  margin: 32px;
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
.order_confirmNot {
  color: red;
}
.order_confirm {
  color: rgb(255, 179, 0);
  font-weight: 900;
  text-align: start;
  width: 100%;
}
.order_complete {
  color: blue;
  font-weight: 900;
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
    width: 35%;
  }
}
</style>