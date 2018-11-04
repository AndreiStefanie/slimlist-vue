export const state = {
  plugins: [],
  essentials: [],
  ecosystem: []
};

// Getters are usually used when a derived state
// (based on the actual state) is needed.
export const getters = {
  hasLinks: state =>
    state.plugins.length > 0 ||
    state.essentials.length > 0 ||
    state.ecosystem.length > 0
};

// The intended (and only) way to change the state
export const mutations = {
  setPlugins(state, payload) {
    state.plugins = payload;
  },
  setEssentials(state, payload) {
    state.essentials = payload;
  },
  setEcosystem(state, payload) {
    state.ecosystem = payload;
  }
};

// Similar to mutations. Usually used as a wrapper around the mutations
// and to perform additional (possible asynchronous) operations.
export const actions = {
  init() {
    // This is automatically called for all modules
    // Perform any initialization logic
  },
  setLinks(context, links) {
    // Just an example for mutating the state from an action
    context.commit('setPlugins', links.plugins.data);
    context.commit('setEssentials', links.essentials.data);
    context.commit('setEcosystem', links.ecosystem.data);
  }
};
