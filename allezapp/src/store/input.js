import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
// import { ToastProgrammatic as Toast } from 'buefy';
/* eslint-disable */

const state = {
  routes: ["-1"],
  componentKey: 0,
};

const getters = {
  getShowCorrectAnswer: (state) => (state.showCorrectAnswer ? state.showCorrectAnswer : false),
  componentKey: (state) => (state.componentKey ? state.componentKey : {}),
};

const actions = {
  async createRoute({ getters }, route) {
    if (!route.id) {
      const result = db.collection('routes').doc(); // will create a document (record)
      route.id = result.id;
    }
    route.created_at = firebase.firestore.FieldValue.serverTimestamp();
    await db.collection('routes').doc(route.id).set(route)
      .then(() => {
        console.log('route successfully created!');
        state.componentKey += 1;
      }).catch((error) => {
        console.error('Error creating route: ', error);
      });
  },
  async updateLastUpdated() {
    // console.log('in updateLastUpdated');
    
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
    // console.log('in initRoutes ');
    bindFirestoreRef('routes', db.collection('routes'));
  }),
  async deleteRoute({getters}, rowid) {
    console.log('deleting row: ', rowid);
    db.collection('routes').doc(rowid).delete().then(async () => {
      console.log('route successfully deleted!');
      state.componentKey++;
      console.log('state.componentKey updated: ', state.componentKey)
    })
    .catch((error) => {
      console.error('Error deleting route: ', error);
    });
  },
  async deleteAll({getters}, currentRoutes) {
    console.log('  in deleteAll, currentRoutes=', currentRoutes);
    currentRoutes.forEach((route) => {
      db.collection('routes').doc(route.id).delete().then(async () => {
        console.log('route successfully deleted!');
        state.componentKey++;
        console.log('state.componentKey updated: ', state.componentKey)
      })
      .catch((error) => {
        console.error('Error deleting route: ', error);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
