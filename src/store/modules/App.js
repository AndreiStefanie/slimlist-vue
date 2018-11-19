export const state = {
  showDrawer: false,
  dark: false,
  focusOpen: false
};

export const getters = {
  showDrawer: state => state.showDrawer,
  dark: state => state.dark,
  focusOpen: state => state.focusOpen
};

export const mutations = {
  setDrawerVisibility(state, visible) {
    state.showDrawer = visible;
  },
  setDark(state, dark) {
    state.dark = dark;
  },
  setFocusOpen(state, focus) {
    state.focusOpen = focus;
  }
};
