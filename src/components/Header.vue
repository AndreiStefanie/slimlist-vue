<template>
  <v-toolbar
    app
    clipped-left
    scroll-off-screen>
    <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
    <span class="title ml-3 mr-5">Slim&nbsp;<span class="font-weight-light">List</span></span>
    <v-spacer></v-spacer>
    <v-text-field
      solo-inverted
      flat
      right
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
     <v-btn v-if="!loggedIn" flat to="signin">SIGN IN</v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ loggedIn: 'user/loggedIn' })
  },
  methods: {
    toggleDrawer() {
      this.$store.commit(
        'app/setDrawerVisibility',
        !this.$store.state.app.showDrawer
      );
    }
  }
};
</script>

<style>
</style>
