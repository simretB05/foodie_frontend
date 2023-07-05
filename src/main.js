import Vue from 'vue';
import App from './App.vue';
import router from './router';
// Correct import statement
import { store } from './store/store';

Vue.config.productionTip = false;

new Vue( {
  router,
  store: store, // Use the store here
  render: h => h( App ),
} ).$mount( '#app' );
