import firebaseApp from '@/plugins/firebase';
import { db } from '@/plugins/firebase';
import 'firebase/auth';
import Vue from 'vue';
import { firebaseAction } from 'vuexfire';

const Auth = firebaseApp.auth();

let userRef;

const defaultSettings = {
  darkTheme: false,
  focusOpen: false
};

export const state = {
  user: undefined,
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

const setUserRef = firebaseAction(({ bindFirebaseRef, commit }, ref) => {
  bindFirebaseRef('settings', ref).then(snapshot => {
    commit('app/setDark', snapshot.darkTheme, { root: true });
    commit('app/setFocusOpen', snapshot.focusOpen, { root: true });
  });
});

export const actions = {
  init({ commit, dispatch }) {
    Auth.onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user);
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              userRef = doc.ref;
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
        commit('setUser', undefined);
      }
      commit('setLoading', false);
    });
    Auth.onIdTokenChanged(() => {
      commit('setLoading', true);
    });
  },
  signOut() {
    Auth.signOut();
  },
  setSettings(context, settings) {
    userRef.set(settings, { merge: true });
  },
  setUserRef
};
