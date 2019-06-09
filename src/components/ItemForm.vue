<template>
  <v-card>
    <v-card-title>
      <span class="headline">Todo</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="What needs to be done"
              required
              autofocus
              :value="item.task"
              @input="update('task', $event)"
              v-model="item.task"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              label="More details"
              rows="1"
              auto-grow
              :value="item.description"
              @input="update('description', $event)"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click.native="$emit('close')">Close</v-btn>
      <v-btn color="blue-grey white--text" @click.native="$emit('save')"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ItemForm',
  props: ['item'],
  model: {
    prop: 'item',
    event: 'update'
  },
  methods: {
    update(key, value) {
      this.$emit('update', { ...this.item, [key]: value });
    }
  }
};
</script>
