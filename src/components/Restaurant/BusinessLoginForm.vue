<template>
  <div class="login-container">
    <div class="login_card">
      <label for="email"> Enter Your Email</label>
      <input
        ref="email_value"
        type="text"
        required
        placeholder="enter your email"
      />
      <label for="first name"> Enter Your Password</label>
      <input
        ref="password_value"
        type="password"
        required
        placeholder="enter your User Password"
      />
      <button @click="getLogInResponse" type="submit">submit</button>
    </div>
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
import TostMessage from "@/components/TostMessage.vue";
export default {
  components: {
    TostMessage,
  },
  data() {
    return {
      password: undefined,
      email: undefined,
      restaurant_token: undefined,
      restaurant_id: undefined,
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    getLogInResponse() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant-login`,
          method: `POST`,
          data: {
            email: this.$refs["email_value"].value,
            password: this.$refs["password_value"].value,
          },
        })
        .then((response) => {
          Cookies.set(`restaurant_token`, response[`data`][0][`token`]);
          Cookies.set(`restaurant_id`, response[`data`][0][`restaurant_id`]);
          this.$router.push(`/partner-home`);
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error;
          this.showToast = true;
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: grid;
  justify-items: center;
  width: 100%;
}

.login_card {
  display: grid;
  justify-items: center;
  width: 70%;
  margin: 32px auto;
  padding: 20px;
  background-color: #fcfcfb;
  border: 1px solid #7ed957;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
  justify-self: start;
  color: #7ed957;
}

input {
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #f5f3f1;
  font-size: 0.8rem;
  justify-self: start;
}

button {
  display: block;
  width: 30%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #7ed957;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

@media only screen and (min-width: 600px) {
  .login_card {
    width: 40%;
  }
}

@media only screen and (min-width: 900px) {
  .login_card {
    width: 30%;
  }
}
</style>