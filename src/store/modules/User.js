export const state = {
  user: undefined
};

export const getters = {
  loggedIn: state => {
    return !!state.user;
  }
};
