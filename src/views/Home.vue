<template>
  <div v-if="!loggedIn" class="w-100">
    <v-container
      fluid
      fill-height
    >
      <v-layout column>
        <v-flex xs12 ma-auto>
          <h1>SlimList</h1>
        </v-flex>
        <v-flex xs12 ma-auto>
          <v-btn color="info" flat centered to="signin">Signin</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else class="w-100">
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12 v-for="t in todos" :key="t.id">
          <v-card color="blue-grey darken-2" class="white--text">
            <v-layout>
              <v-flex xs8>
                <v-card-title primary-title :to="`/list/${t.id}`">
                  <div>
                    <div class="headline">{{ t.type }}</div>
                    <div>{{ getProgress(t) }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3 blue-grey darken-3">
              <span class="mr-2 ml-2"><v-icon color="white" @click="editTodo(t)">edit</v-icon></span>
              <span class="mr-2 ml-2"><v-icon color="white" @click="deleteTodo(t)">delete</v-icon></span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn
        color="blue-grey white--text"
        dark
        fab
        @click="addTodo"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
    <v-layout row justify-center v-if="!!selectedTodo">
      <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit List</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="List Name*"
                    required
                    v-model="selectedTodo.type"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  flat @click.native="handleClose">Close</v-btn>
            <v-btn color="blue-grey white--text" @click.native="handleSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '@/plugins/firebase';

const todos = db.collection('todo-lists');

export default {
  name: 'home',
  components: {},
  metaInfo: {
    title: 'Home Page'
  },
  data() {
    return {
      selectedTodo: {
        type: ''
      },
      showDialog: false,
      fab: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user',
      todos: 'todo/lists'
    })
  },
  methods: {
    getProgress(todo) {
      if (!todo || !todo.todos) {
        return '-';
      }
      return `${todo.todos.filter(t => t.done).length}/${todo.todos.length}`;
    },
    addTodo() {
      this.showDialog = true;
    },
    editTodo(todo) {
      this.selectedTodo = todo;
      this.showDialog = true;
    },
    deleteTodo(todo) {
      todos.doc(todo.id).delete();
    },
    handleClose() {
      this.showDialog = false;
      this.selectedTodo = { type: '' };
    },
    handleSave() {
      this.showDialog = false;
      if (this.selectedTodo.id) {
        todos
          .doc(this.selectedTodo.id)
          .update({ type: this.selectedTodo.type });
      } else {
        todos.add({
          completed: false,
          type: this.selectedTodo.type,
          owner: this.user.uid,
          public: false,
          todos: []
        });
      }
      this.selectedTodo = { type: '' };
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
