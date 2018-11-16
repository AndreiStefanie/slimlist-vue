import { firebaseAction } from 'vuexfire';

export const state = {
  lists: [],
  loaded: false
};

export const mutations = {
  setTodosLoaded(state, loaded) {
    state.loaded = loaded;
  }
};

const setTodosRef = firebaseAction(({ bindFirebaseRef, commit }, ref) => {
  bindFirebaseRef('lists', ref).then(() => {
    commit('setTodosLoaded', true);
  });
});

export const actions = {
  setTodosRef
};

export const getters = {
  lists: state => state.lists,
  loaded: state => state.loaded
};
