<template>
  <v-toolbar app clipped-left scroll-off-screen>
    <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
    <router-link to="/" tag="span">
      <span class="title ml-3 mr-5">
        Slim&nbsp;
        <span class="font-weight-light">List</span>
      </span>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="!loggedIn" flat to="/signin">SIGN IN</v-btn>
      <v-menu
        v-if="loggedIn"
        bottom
        :close-on-content-click="false"
        :nudge-width="200"
        transition="slide-y-transition"
        offset-y
        close-on-click
        lazy
      >
        <v-avatar slot="activator">
          <img v-if="user.photoURL" :src="user.photoURL" alt="Avatar">
          <v-avatar v-else color="blue-grey">
            <span class="white--text headline text-uppercase">{{ user.displayName.charAt(0) }}</span>
          </v-avatar>
        </v-avatar>

        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img v-if="user.photoURL" :src="user.photoURL">
                <v-avatar v-else color="blue-grey">
                  <span class="white--text headline text-uppercase">{{ user.displayName.charAt(0) }}</span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
                <v-list-tile-sub-title>Member</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="dark" color="blue-grey"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Dark theme</v-list-tile-title>
            </v-list-tile>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey" flat @click="logout()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    dark: {
      get() {
        return this.$store.state.app.dark;
      },
      set(value) {
        this.$store.commit('app/setDark', value);
        if (this.loggedIn) {
          const settings = this.settings;
          settings.darkTheme = value;
          this.$store.dispatch('user/setSettings', settings);
        }
      }
    },
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user',
      settings: 'user/settings'
    })
  },
  methods: {
    toggleDrawer() {
      this.$store.commit(
        'app/setDrawerVisibility',
        !this.$store.state.app.showDrawer
      );
    },
    logout() {
      this.$store.dispatch('user/signOut');
    }
  }
};
</script>

<style scoped>
.title:hover {
  cursor: pointer;
}
</style>
