import { firestoreAction } from 'vuexfire';
import db from '@/db';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

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
  // eslint-disable-next-line
  async updateProfileField({ getters }, arg) {
    await db
      .collection('profiles')
      .doc(state.profile[0].id)
      .update(arg)
      .then(() => {
        console.log('      updating profile.def: success!', arg);
      })
      .catch((error) => {
        console.error('      updating profile.def, error:!', error);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
