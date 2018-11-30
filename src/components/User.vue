<template>
  <v-container grid-list-xs fluid>
    <v-layout v-if="loggedIn" wrap row>
      <v-flex xs12 d-flex mb-4>
        <v-avatar size="128" style="margin:auto;">
          <img v-if="user.photoURL" :src="user.photoURL" alt="avatar">
          <v-avatar v-else size="128" color="blue-grey">
            <span class="white--text headline text-uppercase">{{ user.displayName.charAt(0) }}</span>
          </v-avatar>
        </v-avatar>
      </v-flex>
      <v-flex xs12 text-xs-center mb-4>
        <h2>{{ user.displayName }}</h2>
      </v-flex>
      <v-flex xs12 text-xs-center mb-4>
        <v-btn @click.native="signOut">Logout</v-btn>
      </v-flex>
      <v-flex xs12 text-xs-center mb-4>
        <v-card flat ml-4 pl-4>
          <v-switch label="Dark theme" v-model="darkTheme" color="blue-grey"></v-switch>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'User',
  computed: {
    darkTheme: {
      get() {
        return this.settings.darkTheme;
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
    logout() {
      this.signOut();
      this.$router.push('/');
      this.$store.commit('app/setDrawerVisibility', false);
    },
    ...mapActions({
      signOut: 'user/signOut'
    })
  }
};
</script>
