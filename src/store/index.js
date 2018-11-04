import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules
});

// Automatically run the `init` action for every module.
if (modules.actions && modules.actions.init) {
  // Dispatch `init` for the global store or modules without namespace
  store.dispatch(`init`);
}
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    // Dispatch `init` for modules with namespace
    store.dispatch(`${moduleName}/init`);
  }
}

export default store;
