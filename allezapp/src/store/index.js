import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import auth from './auth';
import profile from './profile';
import dataJS from './dataJS';
import input from './input';
import publish from './publish';
import stats from './stats';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    auth,
    profile,
    dataJS,
    input,
    publish,
    stats,
  },
});
