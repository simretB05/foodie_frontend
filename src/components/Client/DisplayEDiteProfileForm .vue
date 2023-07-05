<template>
  <div>
    <div class="edit-card" v-if="!is_Editclosed">
      <img
        @click="is_Editclosed = !is_Editclosed"
        class="nav_user_menu_img"
        src="/images/icons/cross.svg"
        alt=" login avatar"
      />
      <h2>Edit Account Information</h2>
      <div class="signup-card">
        <label for="image">Your profile Image</label>
        <input type="text" ref="image_url" placeholder="enter your picture" />
        <label for="email">Email</label>
        <input
          ref="email"
          type="text"
          required
          placeholder="enter your email"
        />
        <label for="first name">First Name</label>
        <input ref="first_name" type="text" required placeholder="first name" />
        <label for="first name">Last Name</label>
        <input ref="last_name" type="text" required placeholder="Last name" />
        <label for="user name">Username</label>
        <input
          ref="username"
          type="text"
          required
          placeholder="enter your User Name"
        />
        <label for="password">Password</label>
        <input
          ref="password"
          type="password"
          required
          placeholder="enter your User Password"
        />
        <button @click="editUserData" type="submit">Save Changes</button>
      </div>
      <tost-message
        v-if="showToast"
        :title="toastTitle"
        :message="toastMessage"
      ></tost-message>
    </div>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import TostMessage from "@/components/TostMessage.vue";
import axios from "axios";
export default {
  components: {
    TostMessage,
  },
  data() {
    return {
      is_Editclosed: false,
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
      token: Cookies.get(`token`),
      getClient_id: Cookies.get(`client_id`),
    };
  },
  computed: {
    setClientInfo() {
      return this.$store.state.clientInfo;
    },
  },
  mounted() {
    this.getPreviousData();
  },
  methods: {
    getPreviousData() {
      this.$refs[`username`].value = this.setClientInfo[`username`];
      this.$refs[`first_name`].value = this.setClientInfo[`first_name`];
      this.$refs[`last_name`].value = this.setClientInfo[`last_name`];
      this.$refs[`email`].value = this.setClientInfo[`email`];
      this.$refs[`password`].value = this.setClientInfo[`password`];
      this.$refs[`image_url`].value = this.setClientInfo[`image_url`];
    },
    editUserData() {
      let patch_data = {
        username: this.$refs[`username`].value,
        first_name: this.$refs[`first_name`].value,
        last_name: this.$refs[`last_name`].value,
        email: this.$refs[`email`].value,
        image_url: this.$refs[`image_url`].value,
      };
      if (this.$refs[`password`].value == "") {
        patch_data[`password`] = this.setClientInfo[`password`].value;
      }

      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/client`,
          headers: {
            token: this.token,
          },
          method: `PATCH`,
          data: patch_data,
        })
        .then((response) => {
          response;
          this.toastTitle = `Success`;
          this.toastMessage = `successfully Edited  Your information`;
          this.showToast = true;
          this.$store.commit(`setClientInfo`, patch_data);
          this.$root.$emit(`editedCinfo`);
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error[`response`][`data`];
          this.showToast = true;
        });
    },
  },
};
</script>


<style scoped>
.edit-card {
  display: grid;
  justify-items: center;
  width: 90%;
  margin: 32px auto;
  padding: 20px;
  background-color: #fcfcfb;
  border: 1px solid #7ed957;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}
.signup-card {
  display: grid;
  justify-items: center;
  width: 100%;
  padding: 20px;
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
  width: 100%;
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
  width: 40%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #7ed957;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
.nav_user_menu_img {
  width: 20px;
  height: 20px;
  justify-self: start;
}
@media only screen and (min-width: 600px) {
  .signup-card {
    width: 50%;
  }
}
@media only screen and (min-width: 900px) {
  .signup-card {
    width: 100%;
  }
}
</style>