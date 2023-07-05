<template>
  <header class="header">
    <div class="logo_holder">
      <router-link to="/"
        ><img class="logo" src="/images/icons/foodie-logo.svg" alt="logo image"
      /></router-link>
    </div>
    <div
      @click="primaryToggleHandler"
      v-if="!getRest_id"
      class="nav_user_menu_card"
    >
      <img
        v-if="!getRest_id"
        class="nav_user_menu_img"
        src="/images/icons/menu.svg"
        alt=" menu-icon"
      />
    </div>
    <nav class="desktop_nav" v-if="!getRest_id">
      <ul class="nav_desktop_list">
        <router-link to="/partner-login" class="nav-link">
          <li class="desktoplist_item">
            <img
              class="nav_desktop_userImage"
              src="/images/icons/enter.svg"
              alt="enter icon"
            />
            <p class="nav_desktoplogin_text">Partner Log In</p>
          </li>
        </router-link>
        <router-link to="/partner-signup" class="nav-link">
          <li class="desktoplist_item">
            <div class="deskImage-holder">
              <img
                class="nav_desktopuser_signup_img"
                src="/images/icons/shop.svg"
                alt=" login avatar"
              />
            </div>
            <p class="nav_desktopsingup_text">Partner Sign Up</p>
          </li>
        </router-link>
      </ul>
    </nav>
    <div v-if="getRest_id || is_scondaryNavOpen" class="menu-icon-holder">
      <div @click="secondaryToggleHandler" class="nav_user_menu_card">
        <img
          class="nav_user_menu_img"
          src="/images/icons/menu.svg"
          alt=" login avatar"
        />
      </div>
      <h3 v-if="name">Welcome {{ name }}!</h3>
    </div>
    <nav v-if="is_primaryNavOpen" class="primary-nav">
      <div class="primary_nav_card">
        <div>
          <div
            v-if="is_primaryNavOpen"
            @click="primaryToggleHandler"
            class="nav_user_menu_card"
          >
            <img
              class="nav_user_menu_img"
              src="/images/icons/cross.svg"
              alt=" login avatar"
            />
          </div>
        </div>
        <h2 class="nav_title">Welcome!</h2>
        <ul class="main_nav">
          <router-link to="/partner-login" class="nav-link">
            <li class="nav_user_login_card">
              <img
                class="nav_user_login_img"
                src="/images/icons/enter.svg"
                alt="enter icon"
              />
              <p class="nav_login_text">Partner Log In</p>
            </li>
          </router-link>
          <router-link to="/partner-signup" class="nav-link">
            <li class="nav_user_signup_card">
              <div class="nav_user_avatar_card">
                <img
                  class="nav_user_signup_img"
                  src="/images/icons/shop.svg"
                  alt=" login avatar"
                />
              </div>
              <p class="nav_singup_text">PartnerSign Up</p>
            </li>
          </router-link>
        </ul>
      </div>
    </nav>
    <nav v-if="is_scondaryNavOpen" class="secondary-nav">
      <div class="secondary_nav_card">
        <div>
          <div @click="secondaryToggleHandler" class="nav_user_menu_card">
            <img
              class="nav_user_menu_img"
              src="/images/icons/cross.svg"
              alt=" login avatar"
            />
          </div>
        </div>
        <h3 class="secondery-title" v-if="name">Welcome Partner {{ name }}!</h3>
        <ul class="secondery_nav_list">
          <router-link class="nav-link" to="/partner-profile">
            <li class="secondery_nav_item">
              <img
                class="item_img"
                src="/images/icons/shop.svg"
                alt=" login avatar"
              />
              <p class="item_text">View Account</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partnerSide-order">
            <li class="secondery_nav_item">
              <img
                class="item_img"
                src="/images/icons/clipboard-list-check.svg"
                alt=" login avatar"
              />
              <p class="item_text">Orders</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partner-discovery">
            <li class="secondery_nav_item">
              <img
                class="item_img"
                src="/images/icons/shop.svg"
                alt="enter icon"
              />
              <p class="item_text">Restaurants</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partner-menu">
            <li class="secondery_nav_item">
              <img
                class="item_img"
                src="/images/icons/clipboard-list-check.svg"
                alt=" login avatar"
              />
              <p class="item_text">Your Menu</p>
            </li>
          </router-link>
          <li class="secondery_nav_item">
            <button class="logout_btn" @click="logoutHandler">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
    <nav v-if="getRest_id || is_scondaryNavOpen" class="secondary-nav-desktop">
      <h3 class="seconderydesktop-title" v-if="name">
        Welcome Partner at {{ name }}!
      </h3>
      <div class="secondary_desktopnav_card">
        <ul class="seconderydesktop_nav_list">
          <router-link class="nav-link" to="/partner-profile">
            <li class="seconderydesktop_nav_item">
              <img
                class="desktopitem_img"
                src="/images/icons/shop.svg"
                alt=" login avatar"
              />
              <p class="seconderydesktopitem_text">View Account</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partnerSide-order">
            <li class="seconderydesktop_nav_item">
              <img
                class="desktopitem_img"
                src="/images/icons/clipboard-list-check.svg"
                alt=" login avatar"
              />
              <p class="seconderydesktopitem_text">Orders</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partner-discovery">
            <li class="seconderydesktop_nav_item">
              <img
                class="desktopitem_img"
                src="/images/icons/shop.svg"
                alt="enter icon"
              />
              <p class="seconderydesktopitem_text">Restaurants</p>
            </li>
          </router-link>
          <router-link class="nav-link" to="/partner-menu">
            <li class="seconderydesktop_nav_item">
              <img
                class="desktopitem_img"
                src="/images/icons/clipboard-list-check.svg"
                alt=" login avatar"
              />
              <p class="seconderydesktopitem_text">Your Menu</p>
            </li>
          </router-link>
          <li class="seconderydesktop_nav_item">
            <logout-resturant></logout-resturant>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import Cookies from "vue-cookies";
import LogoutResturant from "./LogoutResturant.vue";
export default {
  components: {
    LogoutResturant,
  },
  data() {
    return {
      getRest_id: Cookies.get(`restaurant_id`),
      is_primaryNavOpen: false,
      is_scondaryNavOpen: false,
      name: undefined,
    };
  },
  methods: {
    primaryToggleHandler() {
      this.is_primaryNavOpen = !this.is_primaryNavOpen;
    },
    secondaryToggleHandler() {
      this.is_scondaryNavOpen = !this.is_scondaryNavOpen;
    },
    getRestaurantInfo(restData) {
      let restInfo_json = Cookies.get(`rest_info`);
      if (restInfo_json && restInfo_json[`name`]) {
        this.name = restInfo_json[`name`];
      } else if (restData && restData.length > 0 && restData[0].name) {
        this.name = restData[0].name;
      } else {
        this.name = null;
      }
    },
  },

  mounted() {
    this.$root.$on(`restData`, this.getRestaurantInfo);
    this.getRestaurantInfo();
  },
};
</script>
<style scoped>
.header {
  display: grid;
  place-items: center;
  position: sticky;
  min-height: 10vh;
  padding: 16px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  background-color: white;
}
.logo_holder {
  justify-self: start;
}
.logo {
  width: 50px;
}
.menu-icon-holder {
  display: grid;
  place-items: center;
  justify-self: end;
}
.nav_user_menu_card {
  width: 40px;
  height: 40px;
  background-color: #f1f2f4;
  border-radius: 60%;
  display: grid;
  place-items: center;
  justify-self: end;
}
.nav_user_menu_img {
  width: 60%;
}
.primary-nav,
.secondary-nav {
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 68%;
  height: 93.6vh;
  background-color: #f1f2f4;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.primary_nav_card,
.secondary_nav_card {
  width: 50%;
  height: 30vh;
  display: grid;
  align-self: start;
  justify-items: start;
  justify-self: start;
  padding: 16px;
}

.nav_title {
  height: 20px;
  color: #7ed957;
}

.main_nav,
.secondery_nav_list {
  display: grid;
  place-items: center;
  list-style: none;
  gap: 28px;
}
.nav_user_login_card,
.nav_user_signup_card,
.secondery_nav_item {
  width: 140px;
  display: grid;
  place-items: center;
  font-size: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}
.nav_user_avatar_card {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 60%;
  display: grid;
  place-items: center;
}
.nav-link {
  text-decoration: none;
}
.nav_login_text,
.nav_singup_text,
.item_text {
  color: #7ed957;
  text-decoration: none;
  font-weight: 700;
  justify-items: start;
  width: 100%;
}
.nav_user_signup_img,
.item_img {
  width: 20px;
  height: 30px;
  justify-self: center;
}
.nav_user_login_img {
  width: 30px;
  height: 30px;
}
.desktop_nav,
.secondary-nav-desktop {
  display: none;
}
.secondery-title {
  color: #7ed957;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.99rem;
  width: 100%;
  margin: 32px;
}

.logout_btn,
.desktoplogout_btn {
  justify-self: start;
  background-color: #7ed957;
  width: 100px;
  padding: 8px;
  border: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  color: white;
}
.nav_user_login_card {
}
@media only screen and (min-width: 600px) {
  .primary-nav,
  .secondary-nav {
    width: 40%;
  }
}
@media only screen and (min-width: 900px) {
  .logo_holder {
    width: 351px;
  }
  .logo {
    width: 60px;
  }
  .primary-nav {
    display: none;
  }
  .nav_user_menu_card {
    display: none;
  }
  .desktop_nav {
    display: grid;
    place-items: center;
  }

  .nav_desktop_list {
    display: grid;
    place-items: center;
    width: 300px;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    justify-self: end;
    list-style: none;
  }
  .desktoplist_item {
    width: 160px;
    display: grid;
    place-items: center;
    font-size: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(11px, 1fr));
  }
  .deskImage-holder {
    width: 40px;
    height: 40px;
    background-color: #f1f2f4;
    border-radius: 60%;
    display: grid;
    place-items: center;
  }
  .nav_desktop_userImage {
    width: 30px;
    height: 30px;
    justify-self: end;
  }
  .nav_desktopuser_signup_img {
    width: 20px;
    height: 30px;
  }
  .nav_desktopsingup_text,
  .nav_desktoplogin_text {
    color: #7ed957;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .menu-icon-holder {
    display: none;
  }
  .secondary-nav {
    display: none;
  }
  .secondary-nav-desktop {
    display: grid;
    place-items: center;
    width: 100%;
  }
  .secondary_desktopnav_card {
    width: 100%;
    display: grid;
    place-items: center;
  }
  .seconderydesktop-title {
    color: #7ed957;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.2rem;
    justify-self: end;
    margin-bottom: 16px;
  }
  .seconderydesktop_nav_list {
    list-style: none;
    display: grid;
    place-items: center;
    width: 70%;
    grid-template-columns: repeat(auto-fit, minmax(11px, 1fr));
    justify-self: end;
  }
  .desktopitem_img {
    width: 30px;
  }
  .seconderydesktopitem_text {
    color: #7ed957;
    font-weight: 700;
  }
}
</style>