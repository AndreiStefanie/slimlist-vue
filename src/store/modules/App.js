export const state = {
  showDrawer: false,
  dark: false
};

export const getters = {
  showDrawer: state => state.showDrawer,
  dark: state => state.dark
};

export const mutations = {
  setDrawerVisibility(state, visible) {
    state.showDrawer = visible;
  },
  setDark(state, dark) {
    state.dark = dark;
  }
};
