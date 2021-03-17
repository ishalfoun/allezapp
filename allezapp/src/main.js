import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import firebase from './firebase';
// eslint-disable-next-line
import auth from './auth';
import Navbar from './Navbar.vue';
import router from './router';
import store from './store/index';
/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(firebase);

new Vue({
  router,
  store,
  render: (h) => h(Navbar),
}).$mount('#app');
