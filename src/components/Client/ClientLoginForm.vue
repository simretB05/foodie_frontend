<template>
  <div class="login-container">
    <div class="login_card">
      <label for="email"> Enter Your Email</label>
      <input ref="email" type="text" required placeholder="enter your email" />
      <label for="first name"> Enter Your Password</label>
      <input
        ref="password"
        type="password"
        required
        placeholder="enter your User Password"
      />
      <button @click="getClientResponse" type="submit">submit</button>
    </div>
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>
  </div>
</template>
<script>
import TostMessage from "@/components/TostMessage.vue";
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  components: {
    TostMessage,
  },
  data() {
    return {
      token: undefined,
      client_id: undefined,
      client_info_json: Cookies.get(`client_info`),
      clientDisplay__Array: [],
      newObjectData: undefined,
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  methods: {
    getClientResponse() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/login`,
          method: `POST`,
          data: {
            email: this.$refs["email"].value,
            password: this.$refs["password"].value,
          },
        })
        .then((response) => {
          Cookies.set(`token`, response[`data`][0][`token`]);
          Cookies.set(`client_id`, response[`data`][0][`client_id`]);
          this.$router.push(`/`);
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
  width: 80%;
}
.login_card {
  display: grid;
  justify-items: center;
  width: 80%;
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