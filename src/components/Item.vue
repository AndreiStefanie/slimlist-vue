<template>
  <v-list-tile @click="() => {}">
    <v-list-tile-action>
      <v-checkbox
        v-model="item.done"
        @click.stop.prevent="$emit('set-done', item)"
        :color="accentColor"
      ></v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content
      @click="$emit('edit-item', item)"
      :class="item.done ? 'grey--text' : 'text--primary'"
    >
      <v-list-tile-title>{{ item.task }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-scroll-x-transition>
      <v-icon v-if="item.done" color="green">check</v-icon>
    </v-scroll-x-transition>
  </v-list-tile>
</template>

<script>
export default {
  name: 'slim-item',
  props: {
    item: Object,
    accentColor: String
  }
};
</script>
