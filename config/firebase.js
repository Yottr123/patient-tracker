import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAHWXBP4526U7PgRX-ISADkyMXyNisLtLk",
  authDomain: "patient-tracker-19b05.firebaseapp.com",
  databaseURL: "https://patient-tracker-19b05.firebaseio.com",
  projectId: "patient-tracker-19b05",
  storageBucket: "patient-tracker-19b05.appspot.com",
  messagingSenderId: "616795536385",
  appId: "1:616795536385:web:804d4280ee3c6a609e9400"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log('firebase', firebase);

export {firebase};