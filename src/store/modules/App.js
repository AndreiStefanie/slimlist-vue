export const state = {
  showDrawer: false,
  dark: false
};

export const mutations = {
  setDrawerVisibility(state, visible) {
    state.showDrawer = visible;
  },
  setDark(state, dark) {
    state.dark = dark;
  }
};
