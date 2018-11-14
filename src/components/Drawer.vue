<template>
  <v-navigation-drawer
    v-model="$store.state.app.showDrawer"
    fixed
    clipped
    app
  >
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="list"
        value="true"
        no-action
        v-if="loggedIn"
      >
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

export default {
  name: 'Drawer',
  data() {
    return {
      drawer: false
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

<style>
</style>
