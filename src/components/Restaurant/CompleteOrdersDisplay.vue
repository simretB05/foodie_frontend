<template>
  <div class="main-conf-order">
    <div class="orders_card" v-for="(order, i) in orders" :key="i">
      <h2 class="order_name">{{ order[`name`] }}</h2>
      <p class="order_price">{{ order[`price`] }} $CAD</p>
      <p class="order_id">Order ID {{ order[`order_id`] }}</p>
      <p style="color: red">{{ message }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";

export default {
  components: {},
  props: { confirmedOrder: Array },
  data() {
    return {
      token: Cookies.get(`restaurant_token`),
      restId: Cookies.get(`restaurant_id`),
      orders: [],
      noneDup: undefined,
      is_confirmed: 0,
      completeId: undefined,
      message: undefined,
    };
  },
  mounted() {
    this.$root.$on(`complete`, this.displayCompOrders);
  },
  methods: {
    displayCompOrders(order_id) {
      console.log(order_id);
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-order`,
          params: {
            token: this.token,
          },
        })
        .then((response) => {
          let allOrders = response[`data`];
          allOrders.map((order) => {
            if (order[`is_confirmed`] === 1) {
              order["is_complete"] === 1;
              this.orders.unshift(order);
              this.message = `complete orders`;

              return;
            }
          });
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style  scoped>
.orders_card {
  display: grid;
  place-items: center;
  width: 100%;
  border: 1px solid #f0ebeb;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: lightgoldenrodyellow;
}

.orders_card > div {
  width: 100%;
}

.status_card {
  width: 90%;
}

.order_name {
  margin: 20px auto;
  font-size: 1rem;
  font-weight: bold;
  width: 90%;
  text-align: center;
  align-self: end;
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

@media only screen and (min-width: 600px) {
  /* .orders_card {
        width: 100%;
    } */
}

@media only screen and (min-width: 900px) {
  .main {
    width: 60%;
  }

  .main_orders_card {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .card {
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>