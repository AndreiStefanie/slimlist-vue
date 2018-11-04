import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import NProgress from '@/util/nprogress';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta, {
  keyName: 'page'
});

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeResolve((to, routeFrom, next) => {
  if (routeFrom.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
