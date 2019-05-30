import { firestoreAction } from 'vuexfire';

export const state = {
  lists: [],
  loaded: false
};

export const mutations = {
  setTodosLoaded(state, loaded) {
    state.loaded = loaded;
  }
};

const setTodosRef = firestoreAction(({ bindFirestoreRef, commit }, ref) => {
  bindFirestoreRef('lists', ref).then(() => {
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
