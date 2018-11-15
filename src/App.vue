<template>
  <v-app :dark="$store.state.app.dark">
    <Drawer/>
    <Header/>
    <v-content>
      <router-view/>
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
    ...mapGetters({ loggedIn: 'user/loggedIn', user: 'user/user' })
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
