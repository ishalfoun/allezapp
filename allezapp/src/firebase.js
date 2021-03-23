import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBe0jP9iLL-vdf7KjBlxZcHEtxOF5emkDo',
//   authDomain: 'reddit-clone-3f437.firebaseapp.com',
//   databaseURL: 'https://reddit-clone-3f437.firebaseio.com',
//   projectId: 'reddit-clone-3f437',
//   storageBucket: 'reddit-clone-3f437.appspot.com',
//   messagingSenderId: '451556882507',
//   appId: '1:451556882507:web:73b83dd0bf8cee2dc735ce',
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDQkx2jlXyMg7mddzr8kiqVV1oUxtkYC2M',
  authDomain: 'allezapp-isaak.firebaseapp.com',
  projectId: 'allezapp-isaak',
  storageBucket: 'allezapp-isaak.appspot.com',
  messagingSenderId: '858706529199',
  appId: '1:858706529199:web:250540fb2d12457522fd5a',
  measurementId: 'G-BH94GW0NSD',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
