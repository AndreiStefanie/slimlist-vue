<template>
  <v-layout row mt-2>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list
          subheader
          three-line
        >
          <v-subheader>{{ list.type }}</v-subheader>

          <v-list-tile @click="()=>{}" v-for="(t, index) in list.todos" :key="index">
            <v-list-tile-action>
              <v-checkbox
                v-model="t.done"
                @change.capture="setDone(index)"
                color="green"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="editTodo(t)">
              <v-list-tile-title>{{ t.task }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ t.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
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
      <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Todo</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="What needs to be done*"
                    required
                    v-model="selectedTodo.task"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="More details"
                    rows="3"
                    v-model="selectedTodo.description"
                  ></v-textarea>
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
  </v-layout>
</template>

<script>
import { db } from '@/plugins/firebase';
import { mapGetters } from 'vuex';

const todosRef = db.collection('todo-lists');

const MODE_EDIT = 'edit';
const MODE_CREATE = 'create';

const initialTodo = {
  task: '',
  description: ''
};

export default {
  name: 'List',
  metaInfo: {
    title: 'Todo List'
  },
  data() {
    return {
      list: {},
      selectedTodo: { ...initialTodo },
      showDialog: false,
      mode: undefined
    };
  },
  methods: {
    setDone(index) {
      this.list.todos[index].done = !this.list.todos[index].done;
      todosRef.doc(this.$route.params.id).update({
        todos: this.list.todos
      });
    },
    addTodo() {
      this.showDialog = true;
      this.mode = MODE_CREATE;
    },
    editTodo(todo) {
      this.selectedTodo = todo;
      this.showDialog = true;
      this.mode = MODE_EDIT;
    },
    handleClose() {
      this.showDialog = false;
      this.selectedTodo = { ...initialTodo };
      this.mode = undefined;
    },
    handleSave() {
      this.showDialog = false;
      if (this.mode === MODE_EDIT) {
        todosRef.doc(this.$route.params.id).update({ todos: this.list.todos });
      } else {
        this.list.todos.push({
          done: false,
          task: this.selectedTodo.task,
          description: this.selectedTodo.description
        });
        todosRef.doc(this.$route.params.id).update({
          todos: this.list.todos
        });
      }
      this.selectedTodo = { ...initialTodo };
      this.mode = undefined;
    }
  },
  computed: {
    ...mapGetters({ user: 'user/user' })
  },
  firestore() {
    return {
      list: todosRef.doc(this.$route.params.id)
    };
  },
  watch: {
    $route: {
      immediate: false,
      handler(newRoute) {
        if (this.user) {
          this.$bind('list', todosRef.doc(newRoute.params.id));
        }
      }
    }
  }
};
</script>
