<template>
  <div class="main">
    <h1 class="main_title">Client Orders</h1>
    <div class="main_orders_card">
      <div v-if="orders.length === 0">
        <h2>No Orders Yet</h2>
      </div>
      <div class="orders_container" v-else>
        <div class="orders_card" v-for="(order, i) in orders" :key="i">
          <h2 class="order_name">{{ order[`name`] }}</h2>
          <p class="order_price">{{ order[`price`] }} $CAD</p>
          <p class="order_id">Order ID {{ order[`order_id`] }}</p>
          <p class="order_id">{{ order[`description`] }}</p>
          <confirmed-clients-orders
            :order_id="order[`order_id`]"
          ></confirmed-clients-orders>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="confirmed_orders">
        <h2 class="confirmed_orders_title">Confirmed Client Orders</h2>
        <confirmed-orders-display
          :confirmedOrder="confirmedOrder"
        ></confirmed-orders-display>
      </div>
      <div class="complet_orders">
        <h2 class="confirmed_orders_title">Completed Client Orders</h2>
        <complete-orders-display
          :confirmedOrder="confirmedOrder"
        ></complete-orders-display>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
import ConfirmedClientsOrders from "@/components/Restaurant/ConfirmedClientsOrders.vue";
import ConfirmedOrdersDisplay from "@/components/Restaurant/ConfirmedOrdersDisplay.vue";
import completeOrdersDisplay from "@/components/Restaurant/CompleteOrdersDisplay.vue";
export default {
  components: {
    ConfirmedClientsOrders,
    ConfirmedOrdersDisplay,
    completeOrdersDisplay,
  },
  data() {
    return {
      token: Cookies.get(`restaurant_token`),
      restId: Cookies.get(`restaurant_id`),
      orders: [],
      is_confirmed: 0,
      confirmedOrder: [],
      completeOrder: [],
    };
  },

  methods: {
    getClientOrders() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-order`,
          params: {
            token: this.token,
          },
        })
        .then((response) => {
          let allOrders = response[`data`];
          allOrders.filter((order) => {
            if (order[`is_confirmed`] === 0 && order[`is_complete`] === 0) {
              this.orders.push(order);
              return;
            } else if (
              order[`is_confirmed`] === 1 &&
              order[`is_complete`] === 1
            ) {
              this.completeOrder.push(order);
            } else {
              // looking if  the new order coming from new confirm emits are found in the confirmed
              //  array by comparing the new and old finding the index if so using findindex first and if
              // its > -1 that means the arry is not empty and we found the index position of the duplicate order so
              //  use splice method to splice the duplicate out from the confirmed orders ussing
              // ( indexpositon, the quanity we want to replace, and the order we want to replace it with)

              let index = this.confirmedOrder.findIndex(
                (data) => data[`order_id`] === order[`order_id`]
              );
              if (index > -1) {
                this.confirmedOrder.splice(index, 1, order);
              } else {
                this.confirmedOrder.unshift(order);
              }
              return;
            }
          });
        })
        .catch((error) => {
          error;
        });
    },
  },

  mounted() {
    this.getClientOrders();
    this.$root.$on(`confirmed`, this.getClientOrders);
  },
};
</script>

<style scoped>
.main {
  display: grid;
  place-items: center;
  width: 100%;
}

.main_title {
  color: #7ed957;
  text-decoration: underline;
  margin-bottom: 32px;
  justify-self: center;
}

.main_orders_card {
  display: grid;
  place-items: center;
  width: 100%;
}

.orders_container {
  width: 40%;
}

.card {
  display: grid;
  place-items: center;
  width: 100%;
}

.confirmed_orders {
  width: 90%;
}

.confirmed_orders_title,
.confirmed_orders_title {
  margin: 30px;
}

.orders_card {
  display: grid;
  place-items: center;
  width: 100%;
  border: 1px solid #f0ebeb;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  .corders_container {
    width: 50%;
  }
}

@media only screen and (min-width: 900px) {
  .main {
    width: 60%;
  }

  .main_orders_card {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .corders_container {
    width: 40%;
  }

  .card {
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>