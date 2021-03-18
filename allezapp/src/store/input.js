import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
import { ToastProgrammatic as Toast } from 'buefy';
/* eslint-disable */

const routes = db.collection('routes');

const state = {
  routes: [],
  row: {},
};

const getters = {
};

const actions = {
  async createRoute({ getters }, route) {
    const result = routes.doc(); // will create a document (record)
    route.id = result.id;
    // route.subreddit_id = getters.subreddit.id;
    route.user_id = firebase.auth().currentUser.uid;
    route.created_at = firebase.firestore.FieldValue.serverTimestamp();
    await routes.doc(route.id).set(route)
      .then(() => {
        console.log('route successfully created!');
        Toast.open({
          message: 'Route Created!',
          queue: false,
          type: 'is-success',
        });
      }).catch((error) => {
        console.error('Error creating route: ', error);
      });
  },
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    console.log('in initRoutes ');
    bindFirestoreRef('routes', db.collection('routes'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
