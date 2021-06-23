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
  comments: [],
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

  initComments: firestoreAction(({ bindFirestoreRef }, routeId) => bindFirestoreRef('comments', db.collection('routesReal').doc(routeId).collection('comments'))),

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
  async postPublicComment(arg) {
    // const newEntryRec = {};
    // newEntryRec.profileId = modalProps.profileId;
    // newEntryRec.profileId = modalProps.profileId;
    // newEntryRec.profileId = modalProps.profileId;
    console.log('in post public, arg=', arg);
    await db.collection('routesReal').doc(arg.routeId)
      .collection('comments').doc()
      .set(arg)
      .then(() => {
        console.log('      routesReal.comments updated in DB!, arg', arg);
      })
      .catch((error) => {
        console.error('      Error routesReal.comments updated in DB! ', error);
      });
  },
  // eslint-disable-next-line
  async modalSubmit({getters}, arg) {
    const modalProps = arg;
    const newEntryRec = {};
    newEntryRec.dateDone = firebase.firestore.FieldValue.serverTimestamp();
    newEntryRec.notes = modalProps.notes;
    newEntryRec.doneAs = modalProps.switchTopLeadAuto;
    newEntryRec.profileId = modalProps.profileId;
    newEntryRec.routeId = modalProps.routeId;
    newEntryRec.cmpOrAttempt = modalProps.cmpOrAttempt;
    newEntryRec.username = modalProps.username;
    newEntryRec.image = modalProps.image;
    // modalProps.lead_cmp

    console.log('modalProps: ', modalProps);
    console.log('newEntryRec: ', newEntryRec);

    if (modalProps.checkboxPostPublic === 'Yes') {
      actions.postPublicComment(newEntryRec);
    }

    // update profileroutes record
    //    it has a sub collection of records (entries)
    //    add the current attempt.
    await db.collection('profileroutes').doc(modalProps.profileRoutesId)
      .collection('entries').doc()
      .set(newEntryRec)
      .then(() => {
        console.log('      profileroutes.entries updated in DB!');
      })
      .catch((error) => {
        console.error('      Error profileroutes.entries updated in DB! ', error);
      });

    // logic for setting icons dependng on
    // CMP/Attempted, lead/toprope, and previous values
    //
    // if attempt
    //   if lead
    //     if prev=''
    //       PUT 'A'@L
    //   if top
    //     if prev=''
    //       PUT 'A'@T
    // if cmp
    //   if lead
    //     if prev='A'
    //     or if prev=''
    //       PUT 'Y'@L
    //   if top
    //     if prev='A'
    //     or if prev=''
    //   PUT 'Y'@T
    const nr = newEntryRec;

    console.log('  nr.cmpOrAttempt ', nr.cmpOrAttempt);
    console.log('  nr.doneAs ', nr.doneAs);
    console.log('  modalProps.lead_cmp ', modalProps.lead_cmp);
    console.log('  modalProps.toprope_cmp ', modalProps.toprope_cmp);

    if (nr.cmpOrAttempt === 'A') { // if attempt
      if (nr.doneAs === 'Lead') { //   if lead
        if (!modalProps.lead_cmp || modalProps.lead_cmp === '') { //     if prev=''
          console.log('    update: lead_cmp = A'); //      PUT 'A'@L
          await db.collection('profileroutes').doc(modalProps.profileRoutesId)
            .update({ lead_cmp: 'A' })
            .then(() => {
              console.log('      profileroutes.lead_cmp=A updated in DB!');
            })
            .catch((error) => {
              console.error('      Error profileroutes.lead_cmp=A updated in DB! ', error);
            });
        }
      } else if (nr.doneAs === 'Toprope') { //   if top
        if (!modalProps.toprope_cmp || modalProps.toprope_cmp === '') { //     if prev=''
          console.log('    update: toprope_cmp = A'); //       PUT 'A'@T
          await db.collection('profileroutes').doc(modalProps.profileRoutesId)
            .update({ toprope_cmp: 'A' })
            .then(() => {
              console.log('      profileroutes.toprope_cmp=A updated in DB!');
            })
            .catch((error) => {
              console.error('      Error profileroutes.toprope_cmp=A updated in DB! ', error);
            });
        }
      }
    } else if (nr.cmpOrAttempt === 'Y') { // if cmp
      if (nr.doneAs === 'Lead') { //   if lead
        if (!modalProps.lead_cmp
         || modalProps.lead_cmp === 'A' //     if prev='A'
         || modalProps.lead_cmp === '') { //   or if prev=' '
          console.log('     update: lead_cmp = Y'); //    PUT 'Y'@L
          await db.collection('profileroutes').doc(modalProps.profileRoutesId)
            .update({ lead_cmp: 'Y' })
            .then(() => {
              console.log('      profileroutes.lead_cmp=C updated in DB!');
            })
            .catch((error) => {
              console.error('      Error profileroutes.lead_cmp=C updated in DB! ', error);
            });
        }
      } else if (nr.doneAs === 'Toprope') {
        if (!modalProps.toprope_cmp
         || modalProps.toprope_cmp === 'A' //     if prev='A'
         || modalProps.toprope_cmp === '') { //   or if prev=' '
          console.log('     update: toprope_cmp = Y'); //   PUT 'Y'@T
          await db.collection('profileroutes').doc(modalProps.profileRoutesId)
            .update({ toprope_cmp: 'Y' })
            .then(() => {
              console.log('      profileroutes.toprope_cmp=C updated in DB!');
            })
            .catch((error) => {
              console.error('      Error profileroutes.toprope_cmp=C updated in DB! ', error);
            });
        }
      }
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
    if (profile.lastUpdate && profile.lastUpdate.toDate() >= data.lastUpdate[0].lastUpdate
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
