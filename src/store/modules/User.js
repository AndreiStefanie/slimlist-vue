import firebaseApp from '@/plugins/firebase';
import 'firebase/auth';
import Vue from 'vue';

const Auth = firebaseApp.auth();

export const state = {
  user: undefined
};

export const getters = {
  loggedIn: state => {
    return !!state.user;
  },
  user: state => {
    return state.user;
  }
};

export const mutations = {
  setUser(state, user) {
    Vue.set(state, 'user', user);
  }
};

export const actions = {
  init(store) {
    Auth.onAuthStateChanged(user => {
      if (user) {
        store.commit('setUser', user);
      } else {
        store.commit('setUser', undefined);
      }
    });
  },
  signOut() {
    Auth.signOut();
  }
};
