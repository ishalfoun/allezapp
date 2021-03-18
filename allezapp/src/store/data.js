/* eslint-disable no-unused-vars */
import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';

const routes = db.collection('routes');

const state = {
  routes: [],
};

const getters = {
};

const actions = {
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    console.log('in initRoutes');
    bindFirestoreRef('routes', db.collection('routes'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
