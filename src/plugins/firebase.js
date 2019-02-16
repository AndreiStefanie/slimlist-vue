import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: 'slimlist-19a19.firebaseapp.com',
  databaseURL: 'https://slimlist-19a19.firebaseio.com',
  projectId: 'slimlist-19a19'
};

const app = firebase.initializeApp(config);

Vue.use(VueFire);

export default app;

const db = app.firestore();

db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
  }
});

export { db };
