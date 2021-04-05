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
    // console.log('in getAdditions, routes=', data.routes.length);
    // console.log('         routesReal=', data.routesReal.length);

    let found = false;
    data.removals = [];
    data.additions = [];
    data.routes.forEach((route) => {
      //  1 - loop through routes
      found = false;
      // console.log('  foreach1 ,', route.id);
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
        // console.log('    nothing found, adding id(', route.id);
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
      // console.log('  foreach2 ,', routeR.id);
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
        // console.log('    nothing found, adding(R) id(', routeR.id);

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
    ///
    // dbwaiting: increments for each db write
    //    each db-write checks if it was the last one
    //        if so, update last-updated table
    ///
    let dbwaiting = 0;
    data.additions.forEach(async (element, index) => {
      dbwaiting += 1;
      await db.collection('routesReal').doc(element.id).set(element)
        .then(() => {
          // console.log('      adding in commit: routesReal saved to DB!');
          data.additions.splice(index, 1);
          dbwaiting -= 1;
          if (dbwaiting < 1) { // if last db hit, update last updated
            input.actions.updateLastUpdated();
          }
        })
        .catch((error) => {
          console.error('      adding in commit: Error creating routesReal: ', error);
        });
    });
    data.removals.forEach(async (element, index) => {
      dbwaiting += 1;
      await db.collection('routesReal').doc(element.id).delete()
        .then(() => {
          console.log('      deleting in commit: routesReal deleted/or never existed!');
          data.additions.splice(index, 1);
          dbwaiting -= 1;
          if (dbwaiting < 1) { // if last db hit, update last updated
            input.actions.updateLastUpdated();
          }
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
};

export default {
  namespaced: true,
  state: data,
  actions,
  getters,
};
