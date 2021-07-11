import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';
// import { ToastProgrammatic as Toast } from 'buefy';

const data = {
  routes: [],
  componentKey: 0,
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
    }
    if (arg.ratingChanged) {
      actions.updateRoutesField({ getters }, arg.id, { rating: arg.ratingChanged });
    }
    // if the field is true or false, update
    // if the field does not exist, skip
    if (arg.switchAutoB || arg.switchAutoB === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_autob: arg.switchAutoB });
    }
    if (arg.switchLead || arg.switchLead === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_lead: arg.switchLead });
    }
    if (arg.switchToprope || arg.switchToprope === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_topr: arg.switchToprope });
    }
    if (arg.switchOverhang || arg.switchOverhang === false) {
      actions.updateRoutesField({ getters }, arg.id, { flag_overh: arg.switchOverhang });
    }
  },
  // eslint-disable-next-line
  async updateRoutesField({ getters }, id, arg) {
    console.log('updating in db: id  ', id);
    console.log('updating in db: field ', arg);
    await db
      .collection('routes')
      .doc(id)
      .update(arg)
      .then(() => {
        console.log('      updating routes.def: success!', arg);
        data.componentKey += 1; // this refreshes table and closes the modal
      })
      .catch((error) => {
        console.error('      updating routes.def, error:!', error);
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
