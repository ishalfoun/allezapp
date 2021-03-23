/* eslint-disable */
import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
import profileJS from './profile';
import store from '@/store';
import { ToastProgrammatic as Toast } from 'buefy';

///
///
// this file is only used to display the main data in main screen
///
///
///

const state = {
  routes: [],
  profileroutes: [],
  lastUpdate: []
};

const getters = {
};

function wait(timeout) {
  return new Promise(resolve => {
      setTimeout(resolve, timeout);
  });
};

const actions = {
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('routes', db.collection('routes'));
    bindFirestoreRef('lastUpdate', db.collection('lastUpdate'));
  }),
  initProfileRoutes: firestoreAction(({ bindFirestoreRef }, value) => {
    if (value) {
      bindFirestoreRef('profileroutes', db.collection('profileroutes').where('profileId', '==', value));
    }
  }),
  ///
  // Gets all new routes from server, to create your routes
  ///
  async getRoutes({ getters }, profile) {
    console.log('in getRoutes ');

    console.log('profile date: ', profile.lastUpdate.toDate());
    // console.log('server date: ', lastUpdate[0].lastUpdate.toDate());
    console.log('server date: ', new Date(state.lastUpdate[0].lastUpdate
      .toDate()));
    
    // only get Routes if your last update is not same as serer
    if (state.lastUpdate[0].lastUpdate == profile.lastUpdate) {
      console.log('they equal');
    } else {
      console.log('they dont equal');
    }

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
    let atLeastOneRouteFound = false;
    const newRoutes = [];
    // for each route found on db: 
    // console.log('   state.routes=', state.routes);
    // console.log('   profileRsBelongingToMe', profileRsBelongingToMe);
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
        console.log('      new route found!: ', route);
        atLeastOneRouteFound = true;
        const profileRouteEntry = {
          profileId: profile.id,
          routeId: route.id,
          rating: route.rating,
          routeNum: route.routeNum,
          cmp: 'N',
        };
        
        await db.collection('profileroutes').doc().set(profileRouteEntry)
        .then(() => {
          console.log('      adding in for loop: profileRouteEntry saved to DB!');
        }).catch((error) => {
          console.error('      adding in for loop: Error creating profileRouteEntry: ', error);
        });
      }
      found = false;
    }); // end for loop
    if (atLeastOneRouteFound === false) {
      console.log('   no new routes found');
    }

    ///
    // delete all the non duplicate routes:
    ///
    
    // console.log('var profileRsBelongingToMe: ', profileRsBelongingToMe);
    var duplicates = profileRsBelongingToMe.reduce(function(acc, el, i, arr) {
      // console.log('i('+ i + ') el=' , el);
      // console.log('           arr.indexOf(el):', arr.indexOf(el));
      // console.log('           acc.indexOf(el):', acc.indexOf(el));
      if (arr.findIndex((element) => {
        // console.log('     findIndex: element.routeId('+ element.routeId +') === el.routeId('+ el.routeId );
        return (element.routeId === el.routeId);
      }) !== i && acc.indexOf(el) < 0) {
        // if index is not where it was first found
        // and not yet found
        acc.push(el); 
        // console.log('index is not where it was first found');
        // console.log('  arr.indexOf(el)' + arr.indexOf(el) + ' !== i'+ i +', dup (el):', el);
      }
      return acc;
    }, []);

    console.log('   var duplicates: ', duplicates);
    duplicates.forEach(async (duplicate) => {
      await db.collection('profileroutes').doc(duplicate.id).delete()
      .then(() => {
        console.log('      duplicate profileR deleted');
      }).catch((error) => {
        console.error('      error while deleting dup profileR: ', error);
        console.error('      error while deleting dup profileR: profileR.id ', duplicate.id);
      });
    });
    

    ///
    // delete all the non invalid routes:
    ///

    found = false;
    atLeastOneRouteFound = false;
    profileRsBelongingToMe.forEach( async (profileR) => {
      // console.log('   foreach1: profileR.routeId(' + profileR.routeId);
      state.routes.forEach((route) => {
        // console.log('      foreach2: === route.id(' + route.id + ')');
        if (found === false){
          if (route.id === profileR.routeId) {
            // console.log('      equals=true');
            found = true;
          }
        }
      });
      //   - if not found, add to my profile
      if (found === false) {
        console.log('   invalid profileR found!: ', profileR.routeId);
        atLeastOneRouteFound = true;
        await db.collection('profileroutes').doc(profileR.id).delete()
        .then(() => {
          console.log('      invalid profileR deleted');
        }).catch((error) => {
          console.error('      error while deleting profileR: ', error);
          console.error('      error while deleting profileR: profileR.id ', profileR.id);
        });
      }
      found = false;
    }); // end for loop (deletion loop)
    if (atLeastOneRouteFound === false) {
      console.log('   no old routes found');
    }
    ///
    // once you got all routes, update your profile's lastUpdate field:
    ///
    // appData.timestamp = moment(appData.timestamp.toDate()).format('lll')
    // firebase.firestore.FieldValue.serverTimestamp()
    // console.log('timestamp1: ', firebase.firestore.Timestamp.now().toDate());
    console.log('timestamp2: ', firebase.firestore.FieldValue
    .serverTimestamp());
    // console.log('timestamp3: ', moment(firebase.firestore.FieldValue.serverTimestamp().toDate()).format('lll'));
    // appData.timestamp = moment(firebase.firestore.FieldValue.serverTimestamp().toDate()).format('lll')

    await db
      .collection('profiles')
      .doc(profileJS.state.profile[0].id)
      .update({ lastUpdate: state.lastUpdate[0].lastUpdate.toDate()})
      .then(() => {
      console.log('   profile.lastUpdate write success');

    }).catch((error) => {
      console.error('   profile.lastUpdate write error: ', error);
    });;
  },
};

// const mutations = {
//   checkServer(state, setProfile) {

//   },
// };
export default {
  namespaced: true,
  state,
  actions,
  getters,
};
