<template>
  <v-container v-if="!loggedIn" grid-list-xs fill-height>
    <v-layout row wrap>
      <div style="margin:auto;">
        <v-btn color="blue-grey white--text" large to="signin">Signin</v-btn>
      </div>
    </v-layout>
  </v-container>
  <div v-else class="w-100">
    <v-dialog
      hide-overlay
      persistent
      width="300"
      v-if="!loaded"
    >
      <v-card
        color="blue-grey darken-2"
        dark
      >
        <v-card-text>
          Getting things ready
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container
      fluid
      mt-2
      grid-list-lg
    >
      <v-layout row wrap>
        <v-slide-x-transition
          group
          class="w-100"
        >
          <v-flex xs12 v-for="t in todos" :key="t.id" mb-2>
            <v-card :color="`${getListColor(t.color)}`" :class="getTextColor(t.color)">
              <router-link :to="`/list/${t.id}`" tag="span" style="cursor:pointer;">
                <v-layout>
                  <v-flex xs8>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline" >
                          {{ t.type }}
                          <v-icon
                            v-if="t.completed"
                            :color="t.color&&t.color.whiteText?'white':''"
                          >
                            check
                          </v-icon>
                        </div>
                        <div>
                          {{ getProgress(t) }}
                        </div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </router-link>
              <v-divider light></v-divider>
              <v-card-actions :class="getListColor(t.color)" class="pa-3 darken-2">
                <span class="mr-2 ml-2"><v-icon :color="t.color&&t.color.whiteText?'white':''" @click="editTodo(t)">edit</v-icon></span>
                <span class="mr-2 ml-2"><v-icon :color="t.color&&t.color.whiteText?'white':''" @click="onDelete(t)">delete</v-icon></span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-slide-x-transition>
      </v-layout>
    </v-container>
    <v-btn
      color="blue-grey white--text"
      dark
      fab
      bottom right fixed
      @click="addTodo"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout row justify-center v-if="!!selectedTodo">
      <v-dialog v-model="showDialog" persistent max-width="600px" lazy>
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
                <v-flex xs12 d-inline-block>
                  <span style="margin-right: 1rem;">Color:</span>
                  <color-picker
                    v-model="selectedColor" ml-2
                  ></color-picker>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="handleClose">Close</v-btn>
            <v-btn color="blue-grey white--text" @click.native="handleSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-dialog v-model="confirmDelete" persistent max-width="285" lazy>
      <v-card>
        <v-card-title class="headline">Permanently delete list <strong>{{ selectedTodo.type }}</strong>?</v-card-title>
        <v-card-text>If you are sure that you want to delete the list, click <strong>Delete</strong>, otherwise click <strong>No</strong>.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="confirmDelete=false">No</v-btn>
          <v-btn color="blue-grey white--text" @click="onConfirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      vertical
      :timeout="4000"
    >
      The new list will show up in a few moments
      <v-btn
        flat
        @click="snackbar=false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '@/plugins/firebase';
import ColorPicker from '@/components/ColorPicker';

const todos = db.collection('todo-lists');

const defaultColor = {
  color: 'white',
  whiteText: false
};

export default {
  name: 'home',
  components: {
    ColorPicker
  },
  metaInfo: {
    title: 'Home Page'
  },
  data() {
    return {
      selectedTodo: {
        type: ''
      },
      showDialog: false,
      fab: false,
      snackbar: false,
      confirmDelete: false,
      selectedColor: defaultColor
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      user: 'user/user',
      todos: 'todo/lists',
      loaded: 'todo/loaded'
    })
  },
  methods: {
    getProgress(todo) {
      if (!todo || !todo.todos) {
        return '-';
      }
      return `${todo.todos.filter(t => t.done).length}/${todo.todos.length}`;
    },
    onDelete(todo) {
      this.confirmDelete = true;
      this.selectedTodo = todo;
    },
    onConfirmDelete() {
      this.confirmDelete = false;
      this.deleteTodo(this.selectedTodo);
      this.selectedTodo = { type: '' };
    },
    addTodo() {
      this.showDialog = true;
    },
    editTodo(todo) {
      this.selectedTodo = todo;
      this.selectedColor = todo.color ? todo.color : defaultColor;
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
        todos.doc(this.selectedTodo.id).update({
          type: this.selectedTodo.type,
          color: this.selectedColor
        });
      } else {
        todos
          .add({
            completed: false,
            type: this.selectedTodo.type,
            owner: this.user.uid,
            public: false,
            todos: [],
            color: this.selectedColor
          })
          .then(() => {
            this.snackbar = true;
          });
      }
      this.selectedTodo = { type: '' };
      this.selectedColor = defaultColor;
    },
    getListColor(colorObj) {
      return colorObj ? colorObj.color : 'white';
    },
    getTextColor(colorObj) {
      return colorObj && colorObj.whiteText ? 'white--text' : '';
    }
  }
};
</script>
