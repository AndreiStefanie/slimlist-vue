<template>
  <v-navigation-drawer v-model="$store.state.app.showDrawer" fixed clipped app>
    <v-toolbar
      v-if="loggedIn"
      flat
      class="hidden-md-and-up mt-2 mb-2"
      @click="userDialog = true"
    >
      <v-list class="pa-0">
        <v-list-tile avatar two-line>
          <v-list-tile-avatar>
            <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" />
            <v-avatar v-else color="blue-grey">
              <span class="white--text headline text-uppercase">{{
                user.displayName.charAt(0)
              }}</span>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
            <v-list-tile-sub-title>Member</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-dialog
        v-model="userDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="blue-grey darken-2">
            <v-btn icon dark @click="userDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <User />
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="list" value="true" no-action v-if="loggedIn">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>Lists</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-for="t in todos" :key="t.id" :to="`/list/${t.id}`">
          <v-list-tile-content>
            <v-list-tile-title>{{ t.type }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import User from './User';

export default {
  name: 'Drawer',
  components: {
    User
  },
  data() {
    return {
      drawer: false,
      userDialog: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user',
      todos: 'todo/lists'
    })
  }
};
</script>
