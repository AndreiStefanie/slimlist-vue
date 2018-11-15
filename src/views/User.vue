<template>
  <v-container grid-list-xs fluid>
    <v-layout v-if="loggedIn" wrap row>
      <v-flex xs12 d-flex mb-4>
        <v-avatar size="128" style="margin:auto;">
          <img :src="user.photoURL" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs12 text-xs-center mb-4>
        <h2>{{ user.displayName }}</h2>
      </v-flex>
      <v-flex xs12 text-xs-center mb-4>
        <v-btn @click.native="signOut">Logout</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'User',
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user'
    })
  },
  methods: {
    logout() {
      this.signOut();
      this.$router.push('/');
    },
    ...mapActions({
      signOut: 'user/signOut'
    })
  }
};
</script>
