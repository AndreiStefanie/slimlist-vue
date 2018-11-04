export const state = {
  showDrawer: false
};

export const mutations = {
  setDrawerVisibility(state, visible) {
    state.showDrawer = visible;
  }
};
