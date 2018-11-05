<template>
  <v-toolbar
    app
    clipped-left
    scroll-off-screen>
    <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
    <span class="title ml-3 mr-5">Slim&nbsp;<span class="font-weight-light">List</span></span>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 600px" class="hidden-sm-and-down" mr-2>
      <v-text-field
        solo-inverted
        prepend-inner-icon="search"
        flat
        single-line
        color="white"
        hide-details
      ></v-text-field>
    </v-layout>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="!loggedIn" flat to="signin">SIGN IN</v-btn>
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
        <v-avatar
          slot="activator"
        >
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            alt="Avatar"
          >
        </v-avatar>

        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="user.photoURL">
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
                <v-switch v-model="liveUpdates" color="green"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable live updates</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="hints" color="green"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Enable hints</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-switch v-model="dark" color="green"></v-switch>
              </v-list-tile-action>
              <v-list-tile-title>Dark Theme</v-list-tile-title>
            </v-list-tile>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Log out</v-btn>
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
      }
    },
    ...mapGetters({ loggedIn: 'user/loggedIn', user: 'user/user' })
  },
  data() {
    return {
      hints: false,
      liveUpdates: false
    };
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

<style>
</style>
