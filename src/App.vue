<template>
  <v-app :dark="dark">
    <Drawer />
    <Header />
    <v-content>
      <v-dialog v-if="userLoading" hide-overlay persistent width="300">
        <v-card color="blue-grey darken-2" dark>
          <v-card-text
            >Getting things ready
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { mapGetters } from 'vuex';
import { db } from '@/plugins/firebase';

export default {
  components: {
    Drawer,
    Header
  },
  computed: {
    dark: {
      get() {
        if (this.loggedIn) {
          return this.settings.darkTheme;
        } else {
          return this.appDark;
        }
      }
    },
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      appDark: 'app/dark',
      user: 'user/user',
      userLoading: 'user/loading',
      settings: 'user/settings'
    })
  },
  data() {
    return {
      dialog: true
    };
  },
  watch: {
    loggedIn: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.$store.dispatch(
            'todo/setTodosRef',
            db
              .collection('todo-lists')
              .where('owner', '==', this.user.uid)
              .orderBy('createdAt', 'desc')
          );
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/_layout.scss';

html {
  overflow: auto !important;
}
</style>
