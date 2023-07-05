import Vue from 'vue'
import VueRouter from 'vue-router'
import ClientsMainHomePage from '@/views/ClientsMainHomePage.vue'
import ClientSignupForm from '@/views/ClientSignupForm'
import ClientLoginPage from '@/views/ClientLoginPage'
import ClientProfilePage from '@/views/ClientProfilePage.vue'
import DiscoverPage from '@/views/DiscoverPage.vue'
import OrdersPage from '@/views/OrdersPage.vue'
import RestaurantSignupPage from '@/views/RestaurantSignupPage.vue'
import RestaurantLoginPage from '@/views/RestaurantLoginPage.vue'
import PartnerMenu from '@/views/PartnerMenu.vue'
import PartnersHomePage from '@/views/PartnersHomePage.vue'
import SinglePartnerHomePage from '@/views/SinglePartnerHomePage.vue'
import PartnerSideOrders from '@/views/PartnerSideOrders'
import RestaurantProfilePage from '@/views/RestaurantProfilePage.vue'
import RestaurantPublicPage from '@/views/RestaurantPublicPage.vue'
import ResturantDicoveryPage from '@/views/ResturantDicoveryPage'
import SingleRestaurantHomePage from '@/views/SingleRestaurantHomePage'
import ShoppingCart from '@/views/ShoppingCart.vue'


Vue.use( VueRouter )

const routes = [
  {
    path: '/',
    component: ClientsMainHomePage,
  },
  {
    path: '/user-login',
    component: ClientLoginPage,
  },
  {
    path: '/user-signup',
    component: ClientSignupForm,
  }, {
    path: '/discovery-page',
    component: DiscoverPage,
  },
  {
    path: '/client-profile-page',
    component: ClientProfilePage,
  },
  {
    path: '/client-orders',
    component: OrdersPage,
  },
  {
    path: '/partner-home',
    component: PartnersHomePage,
  },
  {
    path: '/partner-signup',
    component: RestaurantSignupPage,
  },
  {
    path: '/partner-login',
    component: RestaurantLoginPage,
  },
  {
    path: '/partner-public',
    component: RestaurantPublicPage,
  },
  {
    path: '/partner-menu',
    component: PartnerMenu,
  },
  {
    path: '/partner-profile',
    component: RestaurantProfilePage,
  },
  {
    path: '/partner-discovery',
    component: ResturantDicoveryPage,
  },
  {
    path: '/single-partner-home',
    component: SinglePartnerHomePage,
  },
  {
    path: '/single-restaurant-home',
    component: SingleRestaurantHomePage,
  },
  {
    path: '/shopping-cart',
    component: ShoppingCart,
  },
  {
    path: '/partnerSide-order',
    component: PartnerSideOrders,
  },



]

const router = new VueRouter( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes

} )

export default router
