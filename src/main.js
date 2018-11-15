import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './i18n';
import '@/registerServiceWorker';
import '@/plugins/vuetify';
import '@/plugins/reactive-cookie';
import '@/plugins/firebase';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
