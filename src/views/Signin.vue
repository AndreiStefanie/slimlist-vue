<template>
  <v-container grid-list-xs fill-height>
    <v-layout row wrap>
      <div style="margin:auto;">
        <div class="pending" v-if="uiHandler.isPendingRedirect()">
          Just a second
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from 'firebase/app';
import firebaseApp from '@/plugins/firebase';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const uiConfig = {
  signInSuccessUrl: '/',
  signInFlow: 'redirect',
  tosUrl: '/tos',
  privacyPolicyUrl: '/privacy',
  signInOptions: [
    auth.EmailAuthProvider.PROVIDER_ID,
    auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

const appId = 'slimList';

export default {
  name: 'auth',
  mounted() {
    this.uiHandler.start('#firebaseui-auth-container', uiConfig);
  },
  beforeDestroy() {
    this.uiHandler.reset();
  },
  computed: {
    uiHandler() {
      if (firebaseui.auth.AuthUI.getInstance(appId)) {
        return firebaseui.auth.AuthUI.getInstance(appId);
      } else {
        return new firebaseui.auth.AuthUI(firebaseApp.auth(), appId);
      }
    }
  }
};
</script>
