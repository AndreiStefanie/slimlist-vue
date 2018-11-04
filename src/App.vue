<template>
  <v-app id="keep">
    <Drawer/>
    <Header/>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';

export default {
  components: {
    Drawer,
    Header
  }
};
</script>

<style lang="stylus">
#keep {
  .v-navigation-drawer__border {
    display: none;
  }
}
</style>
