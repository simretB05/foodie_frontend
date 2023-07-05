<template>
  <div class="edit-card" v-if="!is_Editclosed">
    <div class="signup-card">
      <img
        @click="closeEditForm"
        class="nav_user_menu_img"
        src="/images/icons/cross.svg"
        alt=" login avatar"
      />
      <label for="email">Your Bussiness profile Image</label>
      <input type="text" ref="banner_url" placeholder="enter your picture" />
      <label for="email">Your Bussiness Banner Image</label>
      <input type="text" ref="profile_url" placeholder="enter your picture" />
      <label for="email">Email</label>
      <input ref="email" type="text" required placeholder="enter your email" />
      <label for="Business name">Business Name</label>
      <input ref="name" type="text" required placeholder="name" />
      <label for="address">Address</label>
      <input ref="address" type="text" required placeholder="address" />
      <label for="phone number">Phone Number</label>
      <input
        ref="phone_number"
        type="text"
        required
        placeholder="phone-number"
      />
      <label for="Bio">Bio</label>
      <input ref="bio" type="text" required placeholder="Bio" />
      <label for="city">City</label>
      <input ref="city" type="text" required placeholder="City" />
      <label for="password">Password</label>
      <input ref="password" type="password" required placeholder="Password" />
      <button @click="editRestData" type="submit">Save changes</button>
    </div>
    <tost-message
      v-if="showToast"
      :title="toastTitle"
      :message="toastMessage"
    ></tost-message>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import axios from "axios";
import TostMessage from "@/components/TostMessage.vue";
export default {
  components: {
    TostMessage,
  },
  data() {
    return {
      is_Editclosed: false,
      token: Cookies.get(`restaurant_token`),
      restaurant_id: Cookies.get(`restaurant_id`),
      showToast: false,
      toastTitle: undefined,
      toastMessage: undefined,
    };
  },
  computed: {
    setRestInfo() {
      return this.$store.state.restInfo;
    },
  },
  mounted() {
    this.getPreviousData();
  },
  methods: {
    closeEditForm() {
      this.is_Editclosed = !this.is_Editclosed;
    },
    getPreviousData() {
      this.$refs[`name`].value = this.setRestInfo[`name`];
      this.$refs[`address`].value = this.setRestInfo[`address`];
      this.$refs[`phone_number`].value = this.setRestInfo[`phone_number`];
      this.$refs[`bio`].value = this.setRestInfo[`bio`];
      this.$refs[`city`].value = this.setRestInfo[`city`];
      this.$refs[`profile_url`].value = this.setRestInfo[`profile_url`];
      this.$refs[`banner_url`].value = this.setRestInfo[`banner_url`];
      this.$refs[`email`].value = this.setRestInfo[`email`];
      this.$refs[`password`].value = this.setRestInfo[`password`];
    },
    editRestData() {
      let patch_data = {
        name: this.$refs[`name`].value,
        address: this.$refs[`address`].value,
        phone_number: this.$refs[`phone_number`].value,
        bio: this.$refs[`bio`].value,
        city: this.$refs[`city`].value,
        profile_url: this.$refs[`profile_url`].value,
        banner_url: this.$refs[`banner_url`].value,
        email: this.$refs[`email`].value,
        password: this.$refs[`password`].value,
      };
      if (this.$refs[`password`].value == "") {
        patch_data[`password`] = this.setRestInfo[`password`].value;
      }
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant`,
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
          this.$store.commit(`setRestInfo`, patch_data);
          this.$root.$emit(`editedRestInfo`);
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error[`response`][`data`][`error`];
          this.showToast = true;
        });
    },
  },
};
</script>


<style scoped>
.edit-card {
  width: 100%;

  background-color: white;
}

.signup-card {
  display: grid;
  justify-items: center;
  width: 100%;
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