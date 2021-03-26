import { firestoreAction } from 'vuexfire';
// import firebase from '@/firebase';
import db from '@/db';
import input from './input';

///
///
// this file is only used to display the main data in main screen
///
///
///

const data = {
  routes: ['-1'],
  routesReal: ['-1'],
  additions: [],
  removals: [],
  componentKey: 0,
};

const getters = {
  componentKey: (state) => (state.componentKey ? state.componentKey : {}),
};

// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

const actions = {
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('routesReal', db.collection('routesReal'));
    bindFirestoreRef('routes', db.collection('routes'));
  }),
  // do checks using id:
  //  1 - loop through routes
  //  2 - if doesnt exist in routesReal = addition
  //  3 - loop through routesReal
  //  4 - if doesnt exist in routes = removal
  //
  getAdditions() {
    if (data.routes.length === 0 && data.routesReal.length === 0) {
      return;
    }
    console.log('in getAdditions, routes=', data.routes.length);
    console.log('         routesReal=', data.routesReal.length);

    let found = false;
    data.removals = [];
    data.additions = [];
    data.routes.forEach((route) => {
      //  1 - loop through routes
      found = false;
      console.log('  foreach1 ,', route.id);
      data.routesReal.find((routeR) => {
        if (route.id === routeR.id) {
          // console.log('    match');
          found = true;
          return true;
        }
        return false;
      });
      // if a matching id was found do nothing
      if (!found) {
        //  2 - if doesnt exist in routesReal = addition
        console.log('    nothing found, adding id(', route.id);
        // only push if doesnt exist yet:
        if (!data.removals.find((element) => {
          if (element.id === route.id) {
            return true;
          }
          return false;
        })) {
          // if not found: add
          data.additions.push(route);
        }
      }
    });

    data.routesReal.forEach((routeR) => {
      found = false;
      //  3 - loop through routesReal
      console.log('  foreach2 ,', routeR.id);
      data.routes.find((route) => {
        if (routeR.id === route.id) {
          // console.log('    match');
          found = true;
          return true;
        }
        return false;
      });
      // if a matching id was found do nothing
      if (!found) {
        //  4 - if doesnt exist in routes = removal
        console.log('    nothing found, adding(R) id(', routeR.id);

        // only push if doesnt exist yet:
        if (!data.removals.find((element) => {
          if (element.id === routeR.id) {
            return true;
          }
          return false;
        })) {
          // if not found: add
          data.removals.push(routeR);
        }
      }
    });

    // additions and removals now filled
  },
  ///
  // additions and removals now filled (from routes)
  // 1. save all additions (to routesReal)
  // 2. delete all removals (to routesReal)
  ///
  commit() {
    data.additions.forEach(async (element, index) => {
      await db.collection('routesReal').doc(element.id).set(element)
        .then(() => {
          console.log('      adding in commit: routesReal saved to DB!');
          data.additions.splice(index, 1);
        })
        .catch((error) => {
          console.error('      adding in commit: Error creating routesReal: ', error);
        });
    });

    data.removals.forEach(async (element, index) => {
      await db.collection('routesReal').doc(element.id).delete()
        .then(() => {
          console.log('      deleting in commit: routesReal deleted/or never existed!');
          data.removals.splice(index, 1);
        })
        .catch((error) => {
          console.error('      adddeletinging in commit: Error deleting routesReal: ', error);
        });
    });
  },
  deleteAddi({ gett }, row) {
    console.log(' in deleteAddi', row);
    console.log('            ', gett);
    input.actions.deleteRoute({ gett }, row.id);
    data.additions.splice((data.additions.findIndex(
      (element) => (element.id === row.id),
    )), 1);
  },
  deleteRemo({ gett }, row) {
    console.log(' in deleteRemo');
    console.log('            ', gett);
    input.actions.createRoute({ gett }, row);
    data.removals.splice((data.removals.findIndex(
      (element) => (element.id === row.id),
    )), 1);
  },
  ///
  // Gets all new routes from server, to create your routes
  ///
  // async getRoutes({ getters }, profile) {
  //   console.log('in getRoutes ', getters);

  //   ///
  //   // only get Routes if your last update is not same as server
  //   ///
  //   console.log('profile date: ', profile.lastUpdate.toDate());
  //   console.log('server date: ', data.lastUpdate[0].lastUpdate.toDate());
  //   if (profile.lastUpdate.toDate() >= data.lastUpdate[0].lastUpdate
  //     .toDate()) {
  //     // if your date is same (or later) than server's: do nothing.
  //     console.log('date is sme or later, doing nothing');
  //     return;
  //   }
  //   //   - first filter the profileR belonging to me:
  //   //   - next loop through both routes and profileroutes
  //   //   - if route not found, add to newRoutes
  //   const profileRsBelongingToMe = data.profileroutes.filter((value) => {
  //     // filter out only those pf's belonging to me:
  //     if (value.profileId === profile.id) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   //   - next loop through both routes and profileroutes
  //   let found = false;
  //   let atLeastOneRouteFound = false;
  //   // for each route found on db:
  //   // console.log('   data.routes=', data.routes);
  //   // console.log('   profileRsBelongingToMe', profileRsBelongingToMe);
  //   data.routes.forEach(async (route) => {
  //     //  check if the route is is found in my profileR)
  //     profileRsBelongingToMe.forEach((value) => {
  //       // console.log(('value(' + value.routeId + ') === route.id(' + route.id + ')'));
  //       if (value.routeId === route.id) {
  //         found = true;
  //       }
  //     });
  //     //   - if route not found, add to my profile
  //     if (found === false) {
  //       console.log('      new route found!: ', route);
  //       atLeastOneRouteFound = true;
  //       const profileRouteEntry = {
  //         profileId: profile.id,
  //         routeId: route.id,
  //         rating: route.rating,
  //         routeNum: route.routeNum,
  //         cmp: 'N',
  //       };

  //       await db.collection('profileroutes').doc().set(profileRouteEntry)
  //         .then(() => {
  //           console.log('      adding in for loop: profileRouteEntry saved to DB!');
  //         })
  //         .catch((error) => {
  //           console.error('      adding in for loop: Error creating profileRouteEntry: ', error);
  //         });
  //     }
  //     found = false;
  //   }); // end for loop
  //   if (atLeastOneRouteFound === false) {
  //     console.log('   no new routes found');
  //   }

  //   ///
  //   // delete all the non duplicate routes:
  //   ///

  //   // console.log('var profileRsBelongingToMe: ', profileRsBelongingToMe);
  //   const duplicates = profileRsBelongingToMe.reduce((acc, el, i, arr) => {
  //     // console.log('i('+ i + ') el=' , el);
  //     // console.log('           arr.indexOf(el):', arr.indexOf(el));
  //     // console.log('           acc.indexOf(el):', acc.indexOf(el));
  //     if (arr.findIndex((element) => (element.routeId === el.routeId))
  //      !== i && acc.indexOf(el) < 0) {
  //       // if index is not where it was first found
  //       // and not yet found
  //       acc.push(el);
  //       // console.log('index is not where it was first found');
  //       // console.log('  arr.indexOf(el)' + arr.indexOf(el) + ' !== i'+ i +', dup (el):', el);
  //     }
  //     return acc;
  //   }, []);

  //   console.log('   var duplicates: ', duplicates);
  //   duplicates.forEach(async (duplicate) => {
  //     await db.collection('profileroutes').doc(duplicate.id).delete()
  //       .then(() => {
  //         console.log('      duplicate profileR deleted');
  //       })
  //       .catch((error) => {
  //         console.error('      error while deleting dup profileR: ', error);
  //         console.error('      error while deleting dup profileR: profileR.id ', duplicate.id);
  //       });
  //   });

  //   ///
  //   // delete all the non invalid routes:
  //   ///

  //   found = false;
  //   atLeastOneRouteFound = false;
  //   profileRsBelongingToMe.forEach(async (profileR) => {
  //     // console.log('   foreach1: profileR.routeId(' + profileR.routeId);
  //     data.routes.forEach((route) => {
  //       // console.log('      foreach2: === route.id(' + route.id + ')');
  //       if (found === false) {
  //         if (route.id === profileR.routeId) {
  //           // console.log('      equals=true');
  //           found = true;
  //         }
  //       }
  //     });
  //     //   - if not found, add to my profile
  //     if (found === false) {
  //       console.log('   invalid profileR found!: ', profileR.routeId);
  //       atLeastOneRouteFound = true;
  //       await db.collection('profileroutes').doc(profileR.id).delete()
  //         .then(() => {
  //           console.log('      invalid profileR deleted');
  //         })
  //         .catch((error) => {
  //           console.error('      error while deleting profileR: ', error);
  //           console.error('      error while deleting profileR: profileR.id ', profileR.id);
  //         });
  //     }
  //     found = false;
  //   }); // end for loop (deletion loop)
  //   if (atLeastOneRouteFound === false) {
  //     console.log('   no old routes found');
  //   }
  //   ///
  //   // once you got all routes, update your profile's lastUpdate field:
  //   ///
  //   // appData.timestamp = moment(appData.timestamp.toDate()).format('lll')
  //   // firebase.firestore.FieldValue.serverTimestamp()
  //   // console.log('timestamp1: ', firebase.firestore.Timestamp.now().toDate());
  //   console.log('timestamp2: ', firebase.firestore.FieldValue
  //     .serverTimestamp());

  //   await db
  //     .collection('profiles')
  //     .doc(profileJS.data.profile[0].id)
  //     .update({ lastUpdate: data.lastUpdate[0].lastUpdate.toDate() })
  //     .then(() => {
  //       console.log('   profile.lastUpdate write success');
  //     })
  //     .catch((error) => {
  //       console.error('   profile.lastUpdate write error: ', error);
  //     });
  // },
};

// const mutations = {
//   checkServer(state, setProfile) {

//   },
// };
export default {
  namespaced: true,
  state: data,
  actions,
  getters,
};
