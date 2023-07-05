<template>
  <div>
    <main class="main">
      <button @click="updateStatus" :orderId="order_id" class="confirm_button">
        Confirm
      </button>
    </main>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import axios from "axios";
export default {
  props: {
    order_id: Number,
    confirmedOrder: Array,
  },
  data() {
    return {
      token: Cookies.get(`restaurant_token`),
      orders: Cookies.get(`orders`),
      confiArray: [],
      is_confirmed: true,
      orderId: undefined,
    };
  },

  mounted() {},
  methods: {
    updateStatus(details) {
      if (this.is_confirmed === true) {
        this.is_confirmed = 1;
      } else {
        this.is_confirmed = 0;
      }
      this.orderId = details[`target`].getAttribute(`orderId`);
      let menuCard = details.target.closest(`.orders_card`);
      this.$root.$emit(`confirmed`);
      menuCard.remove();
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-confirmed-order`,
          headers: {
            token: this.token,
          },
          method: `PATCH`,
          data: {
            is_confirmed: this.is_confirmed,
            order_id: this.order_id,
          },
        })
        .then((response) => {
          response;
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style  scoped>
.confirm_button {
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

.confirm_button:active {
  transform: translateY(3px);
  box-shadow: none;
}
</style>