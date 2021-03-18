/* eslint-disable */
import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
import profile from './profile';

///
///
// this file is only used to display the main data in main screen
///
///
///

const state = {
  routes: [],
  profileroutes: [],
};

const getters = {
};

const actions = {
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('routes', db.collection('routes'));
  }),
  initProfileRoutes: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('profileroutes', db.collection('profileroutes'));
  }),
  ///
  // Gets all new routes from server, to create your routes
  ///
  async getRoutes({ getters }, profile) {
    //   - first filter the profileR belonging to me: 
    //   - next loop through both routes and profileroutes
    //   - if route not found, add to newRoutes
    const profileRsBelongingToMe = state.profileroutes.filter((value) => {
      // filter out only those pf's belonging to me:
      if (value.profileId === profile.id) {
        return true;
      } else {
        return false;
      }
    });
    //   - next loop through both routes and profileroutes
    let found = false;
    const newRoutes = [];
    // for each route found on db: 
    state.routes.forEach( async (route) => {
      //  check if the route is is found in my profileR)
       profileRsBelongingToMe.forEach((value) =>{
        // console.log(('value(' + value.routeId + ') === route.id(' + route.id + ')'));
        if (value.routeId === route.id) {
          found = true;
        }
      });
      //   - if route not found, add to my profile
      if (found === false) {
        console.log('new route found!: ', route);
        const profileRouteEntry = {
          profileId: profile.id,
          routeId: route.id,
          cmp: 'N',
        };
        
        await db.collection('profileroutes').doc().set(profileRouteEntry)
        .then(() => {
          console.log('adding in for loop: profileRouteEntry saved to DB!');
        }).catch((error) => {
          console.error('adding in for loop: Error creating profileRouteEntry: ', error);
        });
      }
      found = false;
    }); // end for loop

    ///
    // Next: delete all the non active ones:
    ///
    found = false;
    profileRsBelongingToMe.forEach( async (profileR) => {
      state.routes.forEach((route) => {
        // console.log(('route(' + route.id + ') === profileR.routeId(' + profileR.routeId + ')'));
        if (route.id === profileR.routeId) {
          found = true;
        }
      });
      //   - if not found, add to my profile
      if (found === false) {
        console.log('invalid profileR found!: ', profileR.routeId);
        await db.collection('profileroutes').doc(profileR.id).delete()
        .then(() => {
          console.log('invalid profileR deleted');
        }).catch((error) => {
          console.error('error while deleting profileR: ', error);
        });
      }
      found = false;
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
