/* eslint-disable no-unused-vars */
import firebase from '@/firebase';
import store from '@/store';
import db from '@/db';
import router from '@/router';

async function getOrCreateProfileThenStore(profile) {
  if (profile.id) {
    db.collection('profiles').doc(profile.id).get().then(async (doc) => {
      if (doc.exists) {
        // console.log('profile exists!, saving to store.', doc.data());
        store.commit('profile/setProfile', profile); // save profile to store
        // store.dispatch('data/getRoutes', profile);
      } else {
        // console.log('profile doesnt exist...creating now', profile);
        db.collection('profiles').doc(profile.id).set(profile)
          .then(() => {
            // console.log('Profile successfully created, saving to store');
            store.commit('profile/setProfile', profile); // save profile to store
            // store.dispatch('data/getRoutes', profile);
          })
          .catch((error) => {
            console.error('Error creating profile: ', error);
          });
      }
    })
      .catch((error) => {
        // console.log('Error getting document:', error);
      });
  }
}

// listener for login changes
firebase.auth().onAuthStateChanged((user) => {
  // if User is signed in.
  if (user) {
    const setUser = {
      id: user.uid,
      name: (user.displayName ? user.displayName : 'guest'),
      image: user.photoURL,
      // technically incorrect: it will update this field everytime the user logs in
      // created_at: firebase.firestore.FieldValue.serverTimestamp(), // current time from server
    };
    db.collection('users').doc(setUser.id).set(setUser);
    // will create a user if it doesnt exist
    store.commit('auth/setUser', setUser); // this sets the user

    const setProfile = { // take profile properties
      id: setUser.id,
      userfk: setUser.name, // TODO: check if this can be removed
      avatar: 1,
      xp: 1,
      level: 1,
      lastUpdate: 0,
    };
    getOrCreateProfileThenStore(setProfile);
  } else {
    // No user is signed in.
    console.log('user signed out.');
    store.commit('auth/setUser', null);
    store.commit('profile/setProfile', null);
  }
});
