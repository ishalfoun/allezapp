// this is the actual connection to our database
import firebase from '@/firebase';

const db = firebase.firestore();
db.settings({
  timestampsInSnapShots: true,
});

export default db;
