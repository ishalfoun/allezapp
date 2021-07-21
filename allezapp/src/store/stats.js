import { firestoreAction } from 'vuexfire';
import db from '@/db';

const data = {
  statsSummary: [],
  statsFull: [],
  entries: [],
};

const getters = {
//   componentKey: (state) => (state.componentKey ? state.componentKey : {}),
};

// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

const actions = {
  // profileroutes is guaranteed to be loaded when this is called
  async initStatsFull() {
    // only get History here
  },
  initStatsSummary() {

  },
  initEntries: firestoreAction(({ bindFirestoreRef }) => bindFirestoreRef('entries', db.collection('entries'))),
};

export default {
  namespaced: true,
  state: data,
  actions,
  getters,
};
