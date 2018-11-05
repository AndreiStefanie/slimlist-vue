import NotFound from '@/views/NotFound.vue';

const MODULE_NOT_FOUND = 'MODULE_NOT_FOUND';

/**
 * Loads the required view/page using webpack
 * @param {string} view Name of the view to load
 */
function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
      .then(module => {
        return module;
      })
      .catch(error => {
        switch (error.code) {
          case MODULE_NOT_FOUND:
            return NotFound;
          default:
            break;
        }
      });
}

export default [
  {
    path: '/',
    name: 'home',
    component: loadView('Home')
  },
  {
    path: '/about',
    name: 'about',
    component: loadView('About')
  },
  {
    path: '/signin',
    name: 'signin',
    component: loadView('Signin')
  },
  {
    path: '/tos',
    name: 'tos',
    component: loadView('Terms')
  }
];
