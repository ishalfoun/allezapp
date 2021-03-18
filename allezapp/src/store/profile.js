import { firestoreAction } from 'vuexfire';
import db from '@/db';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// when we call the init actions,
// it is going to bind the collection
// to this array of subreddits

const state = {
  profile: [],
};

const mutations = {
  setProfile(state, setProfile) {
    if (setProfile) {
      state.profile[0] = setProfile;
    } else {
      state.profile = [];
    }
  },
};

const actions = {
  init: firestoreAction(({ bindFirestoreRef }, userId) => {
    if (userId) {
      bindFirestoreRef('profile', db.collection('profiles').where('id', '==', userId));
    }
  }),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
