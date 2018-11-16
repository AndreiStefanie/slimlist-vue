import firebaseApp from '@/plugins/firebase';
import 'firebase/auth';
import Vue from 'vue';

const Auth = firebaseApp.auth();

export const state = {
  user: undefined,
  loading: false
};

export const getters = {
  loggedIn: state => !!state.user,
  user: state => state.user,
  loading: state => state.loading
};

export const mutations = {
  setUser(state, user) {
    Vue.set(state, 'user', user);
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
};

export const actions = {
  init(store) {
    Auth.onAuthStateChanged(user => {
      if (user) {
        store.commit('setUser', user);
        store.commit('setLoading', false);
      } else {
        store.commit('setUser', undefined);
      }
    });
    Auth.onIdTokenChanged(() => {
      store.commit('setLoading', true);
    });
  },
  signOut() {
    Auth.signOut();
  }
};
