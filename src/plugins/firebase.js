import Vue from 'vue';
import VueFire from 'vuefire';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCY-9mPf0I_91juKitXcJFlYCtHRjzIw5Q',
  authDomain: 'slimlist-19a19.firebaseapp.com',
  databaseURL: 'https://slimlist-19a19.firebaseio.com',
  projectId: 'slimlist-19a19'
};

const app = initializeApp(config);

Vue.use(VueFire);

export default app;

const db = app.firestore();
db.settings({
  timestampsInSnapshots: true
});

export { db };
