import { firestoreAction } from 'vuexfire';
import db from '@/db';
import input from './input';

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
  // 3. also delete comments
  // 4. also delete orphans
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
      console.log(element);
      console.log(index);
      await actions.deleteComments(element.id);
      await db.collection('routesReal').doc(element.id).delete()
        .then(() => {
          console.log('      deleting in commit: routesReal deleted/or never existed!');
          data.removals.splice(index, 1);
          dbwaiting -= 1;
          if (dbwaiting < 1) { // if last db hit, update last updated
            input.actions.updateLastUpdated();
          }
        })
        .catch((error) => {
          console.error('      adddeletinging in commit: Error deleting routesReal: ', error);
        });
    });
    // actions.deleteComments();
    // actions.deleteEntries();
  },
  async deleteComments(routeId) {
    console.log('deleteComments: routeId', routeId);
    await db
      .collection('routesReal')
      .doc(routeId)
      .collection('comments')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          // console.log('full get Document data:', querySnapshot);
          querySnapshot.docs.map((doc) => {
            // console.log('full get each doc:', { id: doc.id, ...doc.data() });
            // only pass the id and the original func arg
            actions.deleteCommentSingle(routeId, doc.id);
            return { id: doc.id, ...doc.data() };
          });
        } else {
          console.log('full get No such document!');
        }
      })
      .catch((error) => {
        console.log('full get Error getting document:', error);
      });
  },
  async deleteCommentSingle(routeId, commentId) {
    console.log(`in deletecommentSingle, routeId: ${routeId}, ${commentId}`);
    await db
      .collection('routesReal')
      .doc(routeId)
      .collection('comments')
      .doc(commentId)
      .delete()
      .then(() => {
        console.log('      routesReal.comments deleted in DB!');
      })
      .catch((error) => {
        console.log('      Error:routesReal.comments not deleted in DB', error);
      });
  },
  async deleteEntries(prouteId) {
    console.log('deleteEntries: routeId', prouteId);
    await db
      .collection('profileroutes')
      .doc(prouteId)
      .collection('entries')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          // console.log('full get Document data:', querySnapshot);
          querySnapshot.docs.map((doc) => {
            // console.log('full get each doc:', { id: doc.id, ...doc.data() });
            // only pass the id and the original func arg
            actions.deleteEntrySingle(prouteId, doc.id);
            return { id: doc.id, ...doc.data() };
          });
        } else {
          console.log('deleteEntries get No such document!');
        }
      })
      .catch((error) => {
        console.log('deleteEntries get Error getting document:', error);
      });
  },
  async deleteEntrySingle(prouteId, entryId) {
    console.log(`in deleteEntrySingle, prouteId: ${prouteId}, entryId ${entryId}`);
    await db
      .collection('profileroutes')
      .doc(prouteId)
      .collection('entries')
      .doc(entryId)
      .delete()
      .then(() => {
        console.log('      profileroutes.entries deleted in DB!');
      })
      .catch((error) => {
        console.log('      Error:profileroutes.entries not deleted in DB', error);
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
