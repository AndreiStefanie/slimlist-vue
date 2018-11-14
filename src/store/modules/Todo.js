import { firebaseAction } from 'vuexfire';

export const state = {
  lists: []
};

const setTodosRef = firebaseAction(({ bindFirebaseRef }, ref) => {
  bindFirebaseRef('lists', ref);
});

export const actions = {
  setTodosRef
};

export const getters = {
  lists: state => state.lists
};
