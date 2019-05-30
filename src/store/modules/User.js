import firebaseApp from '@/plugins/firebase';
import { db } from '@/plugins/firebase';
import 'firebase/auth';
import Vue from 'vue';
import { firestoreAction } from 'vuexfire';

const LOCAL_USER_KEY = 'authUser';
const LOCAL_USER_SETTINGS = 'userSettings';

const Auth = firebaseApp.auth();

let userRef;

const defaultSettings = JSON.parse(
  localStorage.getItem(LOCAL_USER_SETTINGS)
) || {
  darkTheme: false,
  focusOpen: false
};

export const state = {
  user: JSON.parse(localStorage.getItem(LOCAL_USER_KEY)) || undefined,
  loading: false,
  settings: undefined
};

export const getters = {
  loggedIn: state => !!state.user,
  user: state => state.user,
  loading: state => state.loading,
  settings: state => (state.settings ? state.settings : defaultSettings)
};

export const mutations = {
  setUser(state, user) {
    Vue.set(state, 'user', user);
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
};

const setUserRef = firestoreAction(({ bindFirestoreRef, commit }, ref) => {
  bindFirestoreRef('settings', ref).then(snapshot => {
    commit('app/setDark', snapshot.darkTheme, { root: true });
    commit('app/setFocusOpen', snapshot.focusOpen, { root: true });
  });
});

export const actions = {
  init({ commit, dispatch }) {
    Auth.onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              userRef = doc.ref;
              localStorage.setItem(
                LOCAL_USER_SETTINGS,
                JSON.stringify(doc.data())
              );
              commit('app/setDark', doc.data().darkTheme, { root: true });
              commit('app/setFocusOpen', doc.data().focusOpen, { root: true });
            } else {
              userRef = db
                .collection('users')
                .doc(user.uid)
                .set({ uid: user.uid, ...defaultSettings });
            }
            dispatch('setUserRef', userRef);
          });
      } else {
        localStorage.removeItem(LOCAL_USER_KEY);
        commit('setUser', undefined);
      }
      commit('setLoading', false);
    });
  },
  signOut() {
    Auth.signOut();
  },
  setSettings(_context, settings) {
    userRef.set(settings, { merge: true });
    localStorage.setItem(LOCAL_USER_SETTINGS, JSON.stringify(settings));
  },
  setUserRef
};
