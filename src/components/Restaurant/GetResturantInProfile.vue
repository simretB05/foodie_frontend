<template>
  <div class="main-section">
    <section class="main">
      <div class="info__card_holder">
        <h1>Account Settings</h1>
        <div class="info-card" v-if="restInfo">
          <h2>{{ restInfo[`name`] }}</h2>
          <div class="user-info">
            <p>{{ restInfo[`name`] }}</p>
            <p>Address: {{ restInfo[`address`] }}</p>
            <p>Phone#: {{ restInfo[`phone_number`] }}</p>
            <p>Email: {{ restInfo[`email`] }}</p>
            <p>City {{ restInfo[`city`] }}</p>

            <p>{{ restInfo[`bio`] }}</p>
            <img
              class="profile-img"
              :src="restInfo[`profile_url`]"
              alt="profile_image"
            />
            <img
              class="profile-img"
              :src="restInfo[`banner_url`]"
              alt="profile_image"
            />
          </div>
          <div class="buttin-holder">
            <button @click="OpenEditForm">
              <img
                class="edit-icon"
                src="/images/icons/pencil.svg"
                alt="edit icon"
              />
              Edite Profile
            </button>
            <button @click="OpenRemoveForm">
              <img
                class="edit-icon"
                src="/images/icons/trash.svg"
                alt="edit icon"
              />
              Remove Profile
            </button>
          </div>
        </div>
      </div>
      <div class="form-containers">
        <div class="edit-form-holder" v-if="is_edit">
          <display-rest-profile></display-rest-profile>
        </div>
        <div class="remove-form-holder" v-if="is_remove">
          <remove-rest-profile></remove-rest-profile>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Cookies from "vue-cookies";
import axios from "axios";
import DisplayRestProfile from "@/components/Restaurant/DisplayRestProfile.vue";
import RemoveRestProfile from "@/components/Restaurant/RemoveRestProfile.vue";

export default {
  components: {
    DisplayRestProfile,
    RemoveRestProfile,
  },
  data() {
    return {
      restaurant_id: Cookies.get(`restaurant_id`),
      restInfo: undefined,
      is_edit: false,
      is_remove: false,
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
    this.getRestInfo();
    this.$root.$on("editedRestInfo", this.getRestInfo);
  },
  methods: {
    getRestInfo() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/restaurant`,

          params: {
            restaurant_id: this.restaurant_id,
          },
        })
        .then((response) => {
          this.restInfo = response[`data`][0];
          this.$store.commit("setRestInfo", this.restInfo);
        })
        .catch((error) => {
          this.toastTitle = `Error`;
          this.toastMessage = error[`response`][`data`];
          this.showToast = true;
        });
    },
    OpenEditForm() {
      this.is_edit = !this.is_edit;
    },
    OpenRemoveForm() {
      this.is_remove = !this.is_remove;
    },
  },
};
</script>

<style scoped>
.main-section {
  background-color: #fcfcfb;
}
.main {
  width: 100%;
  display: grid;
  place-items: center;
  min-height: 80vh;
}
.info__card_holder {
  max-width: 100%;
  display: grid;
  place-items: center;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}
h1 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.info-card {
  width: 100%;
  display: grid;
  place-items: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.user-info p {
  margin-bottom: 10px;
  font-weight: 100;
  justify-self: start;
  width: 90%;
}
.profile-img {
  max-width: 150px;
  margin-top: 20px;
}

button {
  display: block;
  margin-top: 20px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  justify-self: center;
  color: #7ed957;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}

button img {
  width: 20px;
  margin-right: 10px;
  fill: #7ed957;
}
.user-info {
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 20vh;
}
.user-info > p {
  font-size: 1rem;
  justify-self: start;
}

.profile-img {
  width: 90px;
}
.edit-icon {
  width: 20px;
  height: 20px;
}
.signup-edite_card {
  display: none;
}
.remove_user {
  display: none;
}
.form-containers {
  width: 90%;
}
.edit-form-holder {
  justify-self: start;
}

@media only screen and (min-width: 600px) {
  .info__card_holder {
    width: 80%;
  }
  .info-card {
  }
  .user-info {
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
  }
  .buttin-holder {
    display: grid;
    place-items: center;
    width: 60%;
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
  }
}
@media only screen and (min-width: 900px) {
  .info__card_holder {
    width: 40%;
    margin-left: 32px;
  }
  .user-info {
    grid-template-columns: repeat(auto-fit, minmax(205px, 1fr));
  }
  .form-containers {
    width: 50%;
    justify-self: start;
    margin: 32px;
  }
  .edit-form-holder {
    width: 100%;
  }
}
</style>