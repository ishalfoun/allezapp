import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';

// import { ToastProgrammatic as Toast } from 'buefy';

const data = {
  routes: [],
  componentKey: 0,
  allProfileRoutes: [],
};

const getters2 = {
  getShowCorrectAnswer:
   (state) => (state.showCorrectAnswer ? state.showCorrectAnswer : false),
  componentKey: (state) => (state.componentKey ? state.componentKey : {}),
};

const actions = {
  // eslint-disable-next-line
  applyChangeToRoute({ getters }, arg) {
    console.log('in applyChangeToRoute', arg);
    // we have all the changes as the argument.
    // check if the change is there (either true or false or field doesnte exist)
    if (arg.routeNumChanged) {
      actions.updateRoutesField({ getters }, arg.id, { routeNum: arg.routeNumChanged });
      actions.updateRoutesRealField({ getters }, arg.id, { routeNum: arg.routeNumChanged });
      actions.updateProfileRoutesField({ getters }, arg.id, { routeNum: arg.routeNumChanged });
    }
    if (arg.ratingChanged) {
      actions.updateRoutesField({ getters }, arg.id, { rating: arg.ratingChanged });
      actions.updateRoutesRealField({ getters }, arg.id, { rating: arg.ratingChanged });
      actions.updateProfileRoutesField({ getters }, arg.id, { rating: arg.ratingChanged });
    }
    // explanation of the if-statement for the flags:
    //   -if the field is true or false, update
    //   -if the field does not exist (undefined), skip
    if (arg.switchAutoB || arg.switchAutoB === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_autob: arg.switchAutoB });
      actions.updateRoutesRealField({ getters }, arg.id, { flag_autob: arg.switchAutoB });
      actions.updateProfileRoutesField({ getters }, arg.id, { flag_autob: arg.switchAutoB });
    }
    if (arg.switchLead || arg.switchLead === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_lead: arg.switchLead });
      actions.updateRoutesRealField({ getters }, arg.id, { flag_lead: arg.switchLead });
      actions.updateProfileRoutesField({ getters }, arg.id, { flag_lead: arg.switchLead });
    }
    if (arg.switchToprope || arg.switchToprope === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_topr: arg.switchToprope });
      actions.updateRoutesRealField({ getters }, arg.id, { flag_topr: arg.switchToprope });
      actions.updateProfileRoutesField({ getters }, arg.id, { flag_topr: arg.switchToprope });
    }
    if (arg.switchOverhang || arg.switchOverhang === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_overh: arg.switchOverhang });
      actions.updateRoutesRealField({ getters }, arg.id, { flag_overh: arg.switchOverhang });
      actions.updateProfileRoutesField({ getters }, arg.id, { flag_overh: arg.switchOverhang });
    }
  },
  // eslint-disable-next-line
  async updateRoutesField({ getters }, id, arg) {
    console.log('updating in db routes: id  ', id);
    console.log('updating in db routes: field ', arg);
    await db
      .collection('routes')
      .doc(id)
      .update(arg)
      .then(() => {
        console.log('      updating routes.field: success!', arg);
        data.componentKey += 1; // this refreshes table and closes the modal
      })
      .catch((error) => {
        console.error('      updating routes.field, error:!', error);
      });
  },
  // eslint-disable-next-line
  async updateRoutesRealField({ getters }, id, arg) {
    console.log('updating in db routesReal: id  ', id);
    console.log('updating in db routesReal: field ', arg);
    // routesReal has the same id's as routes
    // routesReal is what the users copy
    // routes is what I edit before publishing
    await db
      .collection('routesReal')
      .doc(id)
      .update(arg)
      .then(() => {
        console.log('      updating routesReal.field: success!', arg);
        data.componentKey += 1; // this refreshes table and closes the modal
      })
      .catch((error) => {
        console.error('      updating routesReal.field, error:!', error);
      });
  },
  // eslint-disable-next-line
  async updateProfileRouteSingleField({ getters }, id, arg) {
    console.log('updating in db profileRoutes.single: id  ', id);
    console.log('updating in db profileRoutes.single: field ', arg);
    await db
      .collection('profileroutes')
      .doc(id)
      .update(arg)
      .then(() => {
        console.log('      updating profileroutes.single.field: success!', arg);
        data.componentKey += 1; // this refreshes table and closes the modal
      })
      .catch((error) => {
        console.error('      updating profileroutes.single.field, error:!', error);
      });
  },
  // eslint-disable-next-line
  async updateProfileRoutesField({ getters }, id, arg) {
    console.log('updating in db profileRoutes: id ', id);
    console.log('updating in db profileRoutes: field ', arg);

    // [x] we need the collection profileroutes
    // [x] loop through it
    // [x] for each record, check if the id matches,
    // [x]     if so, save that profilerouteId
    //      later, do an update for that profilerouteId (use batch write)
    //      also delete subrecords (comments)

    // dataJS.data.profileroutes
    await db
      .collection('profileroutes')
      // .where('rating', '==', '5.10a')
      .where('routeId', '==', id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          // console.log('full get Document data:', querySnapshot);
          querySnapshot.docs.map((doc) => {
            console.log('full get each doc:', { id: doc.id, ...doc.data() });
            // only pass the id and the original func arg
            this.updateProfileRouteSingleField({ getters }, doc.id, arg);
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
  // eslint-disable-next-line
  async createRoute({ getters }, arg) {
    const route = arg;
    if (!route.id) {
      const result = db.collection('routes').doc(); // will create a document (record)
      route.id = result.id;
    }
    route.created_at = firebase.firestore.FieldValue.serverTimestamp();
    await db.collection('routes').doc(route.id).set(route)
      .then(() => {
        console.log('route successfully created!');
        data.componentKey += 1;
      })
      .catch((error) => {
        console.error('Error creating route: ', error);
      });
  },
  async updateLastUpdated() {
    // console.log('in updateLastUpdated');
    const newUpdate = {
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection('lastUpdate').doc('lastUpdate').set(newUpdate)
      .then(() => {
        console.log('adding. lastUpdate saved to DB!');
      })
      .catch((error) => {
        console.error('adding. Error creating lastUpdate: ', error);
      });
  },
  initRoutes: firestoreAction(({ bindFirestoreRef }) => {
    // console.log('in initRoutes ');
    bindFirestoreRef('routes', db.collection('routes'));
  }),
  // eslint-disable-next-line
  async deleteRoute({getters}, rowid) {
    console.log('deleting row: ', rowid);
    db.collection('routes').doc(rowid).delete().then(async () => {
      console.log('route successfully deleted!');
      data.componentKey += 1;
      console.log('data.componentKey updated: ', data.componentKey);
    })
      .catch((error) => {
        console.error('Error deleting route: ', error);
      });
  },
  // eslint-disable-next-line
  async deleteAll({getters}, currentRoutes) {
    console.log('  in deleteAll, currentRoutes=', currentRoutes);
    currentRoutes.forEach((route) => {
      db.collection('routes').doc(route.id).delete().then(async () => {
        console.log('route successfully deleted!');
        data.componentKey += 1;
        console.log('data.componentKey updated: ', data.componentKey);
      })
        .catch((error) => {
          console.error('Error deleting route: ', error);
        });
    });
  },
};

export default {
  namespaced: true,
  state: data,
  actions,
  getters: getters2,
};
