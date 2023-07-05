<template>
  <div>
    <main class="main">
      <button @click="updateStatus" :orderId="order_id" class="complete_button">
        Complete
      </button>
    </main>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import axios from "axios";
export default {
  props: {
    confirmedOrder: Array,
    order_id: Number,
  },
  data() {
    return {
      token: Cookies.get(`restaurant_token`),
      allCompOrderArray: [],
      is_complete: true,
      orderId: undefined,
    };
  },

  methods: {
    updateStatus(details) {
      this.orderId = details[`target`].getAttribute(`orderId`);
      let menuCard = details.target.closest(`.orders_card`);
      this.$root.$emit(`complete`, this.orderId);
      menuCard.remove();
      if (this.is_complete === true) {
        this.is_complete = 1;
      } else {
        this.is_complete = 0;
      }
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-complete-order`,

          method: `PATCH`,
          data: {
            is_complete: this.is_complete,
            order_id: this.order_id,
          },
        })
        .then(() => {})
        .catch((error) => {
          error;
        });
    },
  },
  mounted() {},
};
</script>

<style  scoped>
.complete_button {
  width: 160px;
  background-color: lightcoral;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: 700;
  padding: 10px;
  transition: background-color 0.5s ease;
  box-shadow: 0 1px 0 #afcce7;
  margin: 16px;
}
.complete_button:active {
  transform: translateY(3px);
  box-shadow: none;
}
</style>