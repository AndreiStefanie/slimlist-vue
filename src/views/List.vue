<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list
          subheader
          three-line
        >
          <v-subheader>{{ list.type }}</v-subheader>

          <v-list-tile @click="()=>{}" v-for="t in list.todos" :key="t.task">
            <v-list-tile-action>
              <v-checkbox
                v-model="notifications"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="notifications = !notifications">
              <v-list-tile-title>{{ t.task }}</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '@/plugins/firebase';
import { mapGetters } from 'vuex';

export default {
  name: 'List',
  metaInfo: {
    title: 'Todo List'
  },
  data() {
    return {
      sound: false,
      widgets: false,
      notifications: true,
      list: {}
    };
  },
  computed: {
    ...mapGetters({ user: 'user/user' })
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(newRoute) {
        if (this.user) {
          this.$bind(
            'list',
            db.collection('todo-lists').doc(newRoute.params.id)
          );
        }
      }
    }
  }
};
</script>
