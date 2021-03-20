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
    actions.updateLastUpdated();
  },
  async updateLastUpdated() {
    console.log('in updateLastUpdated');
    
    const newUpdate = { 
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('lastUpdate').doc('lastUpdate').set(newUpdate)
    .then(() => {
      console.log('adding. lastUpdate saved to DB!');
    }).catch((error) => {
      console.error('adding. Error creating lastUpdate: ', error);
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
