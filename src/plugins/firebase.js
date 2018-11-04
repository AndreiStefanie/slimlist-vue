import Vue from 'vue';
import VueFire from 'vuefire';
import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'AIzaSyCY-9mPf0I_91juKitXcJFlYCtHRjzIw5Q',
  authDomain: 'slimlist-19a19.firebaseapp.com',
  databaseURL: 'https://slimlist-19a19.firebaseio.com',
  projectId: 'slimlist-19a19'
};

initializeApp(config);

Vue.use(VueFire);
