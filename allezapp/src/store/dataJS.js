import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
// eslint-disable-next-line
import profileJS from './profile';

///
///
// this file is only used to display the main data in main screen
///
///
///

const data = {
  routesReal: [],
  profileroutes: [],
  lastUpdate: [],
  loading: false,
  componentKey2: 0,
  entries: [],
};

const getters2 = {
  getLoading: (state) => (state.loading ? state.loading : false),
  getComponentKey2: (state) => (state.componentKey2 ? state.componentKey2 : 0),
};

// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

const actions = {
  initEntries: firestoreAction(({ bindFirestoreRef }, profileRouteId) => bindFirestoreRef('entries', db.collection('profileroutes').doc(profileRouteId).collection('entries'))),

  // eslint-disable-next-line
  async deleteStat({ getters }, arg) {
    const toDeleteStatsRecord = arg;
    await db.collection('stats').doc(toDeleteStatsRecord.id)
      .collection('entries').doc()
      .set(toDeleteStatsRecord)
      .then(() => {
        console.log('      toDeleteStatsRecord saved to DB!');
      })
      .catch((error) => {
        console.error('      Error creating toDeleteStatsRecord: ', error);
      });
  },
  // eslint-disable-next-line
  async getEntries({ getters }, arg) {
    // const newStatsRecord = arg;
    // await db.collection('stats').doc(newStatsRecord.id)
    //   .collection('entries').get()
    //   .then((doc) => {
    //     console.log('      stats get: ', doc.docs[0].cmp);
    //   })
    //   .catch((error) => {
    //     console.error('      Error getting stats: ', error);
    //   });
  },
  // eslint-disable-next-line
  async modalComplete({getters}, arg) {
    const modalProps = arg;
    const newEntryRec = {};
    newEntryRec.cmpOrAttempt = 'C';
    newEntryRec.dateDone = firebase.firestore.FieldValue.serverTimestamp();
    newEntryRec.notes = modalProps.notes;

    console.log('modalProps: ', modalProps);
    console.log('newEntryRec: ', newEntryRec);

    // update profileroutes record
    //    it has a sub collection of records (entries)
    // add the current attempt.
    await db.collection('profileroutes').doc(modalProps.profileRoutesId)
      .collection('entries').doc()
      .set(newEntryRec)
      .then(() => {
        console.log('      profileroutes.entries updated in DB!');
      })
      .catch((error) => {
        console.error('      Error profileroutes.entries updated in DB! ', error);
      });

    // also update profileroute.cmp == 'Y'
    await db.collection('profileroutes').doc(modalProps.profileRoutesId)
      .update({ cmp: 'Y' })
      .then(() => {
        console.log('      profileroutes.cmp updated in DB!');
      })
      .catch((error) => {
        console.error('      Error profileroutes.cmp updated in DB! ', error);
      });

    data.componentKey2 += 1; // this refreshes table and closes the modal
    //
    // old:
    //
    // const newStatsRecord = arg;
    // newStatsRecord.cmp = 'Y';
    // newStatsRecord.dateAdded = firebase.firestore.FieldValue.serverTimestamp();
    // // if (newStatsRecord) {
    // // }
    // console.log('newStatsRecord: ', newStatsRecord);
    // // create stats rec which is linked to a profileroute
    // // this stats record has a sub collection of records (each line in stats)
    // await db.collection('stats').doc(newStatsRecord.profileRoutesId)
    //   .collection('entries').doc()
    //   .set(newStatsRecord)
    //   .then(() => {
    //     console.log('      newStatsRecord saved to DB!');
    //   })
    //   .catch((error) => {
    //     console.error('      Error creating newStatsRecord: ', error);
    //   });
    // await db.collection('stats').doc(newStatsRecord.profileRoutesId)
    //   .set({ profileId: newStatsRecord.profileId })
    //   .then(() => {
    //     console.log('      StatsRecord-profileid saved to DB!');
    //   })
    //   .catch((error) => {
    //     console.error('      Error StatsRecord-profileid: ', error);
    //   });
    //
    //
    //
    //
    // set this profile route to cmp in UI
    // const index = data.profileroutes.findIndex(
    //   (element) => element.routeId === modalProps.routeId,
    // );
    // console.log('index of profileroute in UI is: ', data.profileroutes[index]);
    // data.profileroutes[index].cmp = 'Y';
    // data.componentKey2 += 1; // this refreshes table and closes the modal
  },
  // eslint-disable-next-line
  async modalAttempted({ getters }, arg) {

    const modalProps = arg;
    const newEntryRec = {};
    newEntryRec.cmpOrAttempt = 'A';
    newEntryRec.dateDone = firebase.firestore.FieldValue.serverTimestamp();
    newEntryRec.notes = modalProps.notes;

    console.log('modalProps: ', modalProps);
    console.log('newEntryRec: ', newEntryRec);

    // update profileroutes record
    //    it has a sub collection of records (entries)
    // add the current attempt.
    await db.collection('profileroutes').doc(modalProps.profileRoutesId)
      .collection('entries').doc()
      .set(newEntryRec)
      .then(() => {
        console.log('      profileroutes.entries updated in DB!');
      })
      .catch((error) => {
        console.error('      Error profileroutes.entries updated in DB! ', error);
      });

    // also update profileroute.cmp == 'A'
    // but only if:
    //    if route was not completed yet
    if (modalProps.cmp !== 'Y') {
      // set cmp to 'A'
      await db.collection('profileroutes').doc(modalProps.profileRoutesId)
        .update({ cmp: 'A' })
        .then(() => {
          console.log('      profileroutes.cmp updated in DB!');
        })
        .catch((error) => {
          console.error('      Error profileroutes.cmp updated in DB! ', error);
        });
    }

    data.componentKey2 += 1; // this refreshes table and closes the modal
  },
  //
  //
  setLoading(value) {
    console.log('in loadingsetter', value);
    data.loading = value;
  },
  setComponentKey2(value) {
    console.log('in componentKey2 setter', value);
    data.componentKey2 = value;
  },
  initRoutes: firestoreAction(({ bindFirestoreRef }) => bindFirestoreRef('routesReal', db.collection('routesReal'))),
  initLastUpdate: firestoreAction(({ bindFirestoreRef }) => bindFirestoreRef('lastUpdate', db.collection('lastUpdate'))),
  initProfileRoutes: firestoreAction(({ bindFirestoreRef }, value) => {
    if (value) {
      return bindFirestoreRef('profileroutes', db.collection('profileroutes').where('profileId', '==', value));
    }
    return new Promise();
  }),
  //
  // No longer needed, as the new way to complete, is through modal.
  //
  // eslint-disable-next-line
  // async setCompleted({ getters }, row) {
  //   console.log('in setCompY: row=', row.cmp);
  //   await db
  //     .collection('profileroutes')
  //     .doc(row.id)
  //     .update({ cmp: row.cmp })
  //     .then(() => {
  //       console.log('      updating profileroutes.cmp: success!');
  //     })
  //     .catch((error) => {
  //       console.error('      updating profileroutes.cmp, error:!', error);
  //     });
  // },
  ///
  // Gets all new routes from server, to create your profileroutes
  ///
  // eslint-disable-next-line
  async getRoutes({ getters }, profile) {
    // console.log(' ', getters);

    ///
    // only get Routes if your last update is not same as server
    ///

    // console.log('   server date: ', data.lastUpdate[0].lastUpdate.toDate());
    // console.log('   profile date: ', profile.lastUpdate.toDate());
    if (profile.lastUpdate.toDate() >= data.lastUpdate[0].lastUpdate
      .toDate()) {
      console.log('        date is same or later, =no new update, doing nothing');
      return;
    }
    console.log('        date is different, getting new routes');

    data.loading = true;
    //   - first filter the profileR belonging to me:
    //   - next loop through both routes and profileroutes
    //   - if route not found, add to newRoutes
    const profileRsBelongingToMe = data.profileroutes.filter((value) => {
      // filter out only those pf's belonging to me:
      if (value.profileId === profile.id) {
        return true;
      }
      return false;
    });
    //   - next loop through both routes and profileroutes
    let found = false;
    let atLeastOneRouteFound = false;
    // for each route found on db:
    // console.log('   data.routes=', data.routes);
    // console.log('   profileRsBelongingToMe', profileRsBelongingToMe);
    data.routesReal.forEach(async (route) => {
      //  check if the route is is found in my profileR)
      profileRsBelongingToMe.forEach((value) => {
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
          flag_overh: (route.flag_overh) ? route.flag_overh : false,
          flag_lead: (route.flag_lead) ? route.flag_lead : false,
          flag_topr: (route.flag_topr) ? route.flag_topr : false,
          flag_autob: (route.flag_autob) ? route.flag_autob : false,
          color: (route.color) ? route.color : false,
          created_at: (route.created_at) ? route.created_at : false,
        };

        await db.collection('profileroutes').doc().set(profileRouteEntry)
          .then(() => {
            console.log('      adding in for loop: profileRouteEntry saved to DB!');
          })
          .catch((error) => {
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
    const duplicates = profileRsBelongingToMe.reduce((acc, el, i, arr) => {
      // console.log('i('+ i + ') el=' , el);
      // console.log('           arr.indexOf(el):', arr.indexOf(el));
      // console.log('           acc.indexOf(el):', acc.indexOf(el));
      if (arr.findIndex((element) => (element.routeId === el.routeId))
       !== i && acc.indexOf(el) < 0) {
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
          // if (data.loading) {
          //   data.loading = false;
          // }
        })
        .catch((error) => {
          console.error('      error while deleting dup profileR: ', error);
          console.error('      error while deleting dup profileR: profileR.id ', duplicate.id);
        });
    });

    ///
    // delete all the non invalid routes:
    ///

    found = false;
    atLeastOneRouteFound = false;
    profileRsBelongingToMe.forEach(async (profileR) => {
      // console.log('   foreach1: profileR.routeId(' + profileR.routeId);
      data.routesReal.forEach((route) => {
        // console.log('      foreach2: === route.id(' + route.id + ')');
        if (found === false) {
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
          })
          .catch((error) => {
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
    // appdata.timestamp = moment(appdata.timestamp.toDate()).format('lll')
    // firebase.firestore.FieldValue.serverTimestamp()
    // console.log('timestamp1: ', firebase.firestore.Timestamp.now().toDate());
    console.log('timestamp2: ', firebase.firestore.FieldValue
      .serverTimestamp());

    // console.log('before profiles.save: data.lastUpdate[0]:',
    // data.lastUpdate[0].lastUpdate.toDate());

    await db
      .collection('profiles')
      .doc(profileJS.state.profile[0].id)
      .update({ lastUpdate: data.lastUpdate[0].lastUpdate.toDate() })
      .then(() => {
        console.log('   profile.lastUpdate write success:', data.lastUpdate[0].lastUpdate.toDate());
        if (data.loading) {
          data.loading = false;
        }
      })
      .catch((error) => {
        console.error('   profile.lastUpdate write error: ', error);
      });
  },
};

// const mutations = {
//   checkServer(data, setProfile) {

//   },
// };
export default {
  namespaced: true,
  state: data,
  actions,
  getters: getters2,
};
