<template>
  <v-layout row mt-2>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <v-subheader>
            <span :class="{ strike: list.completed }">{{ list.type }}</span>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              left
              transition="slide-y-transition"
              offset-y
              close-on-content-click
            >
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-switch v-model="focusOpen" color="blue-grey"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>Focus on open todos</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-subheader>

          <v-progress-linear
            :value="progress"
            :color="accentColor"
            height="5px"
            v-if="list.todos.length > 0"
          ></v-progress-linear>

          <draggable
            v-model="mainTodos"
            v-bind="{ touchStartThreshold: 50, delay: 200 }"
            @start="drag = true"
            @end="drag = false"
          >
            <v-list-tile
              @click="() => {}"
              v-for="(t, index) in mainTodos"
              :key="index"
            >
              <v-list-tile-action>
                <v-checkbox
                  v-model="t.done"
                  @click.stop.prevent="setDone(t)"
                  :color="accentColor"
                ></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content
                @click="handleEdit(t)"
                :class="t.done ? 'grey--text' : 'text--primary'"
              >
                <v-list-tile-title>{{ t.task }}</v-list-tile-title>
                <v-list-tile-sub-title>{{
                  t.description
                }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-scroll-x-transition>
                <v-icon v-if="t.done" color="green">check</v-icon>
              </v-scroll-x-transition>
            </v-list-tile>
          </draggable>
        </v-list>
        <v-list three-line v-if="secondaryTodos.length > 0">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-sub-title
                  >Done ({{ secondaryTodos.length }})</v-list-tile-sub-title
                >
              </v-list-tile-content>
            </v-list-tile>
            <draggable
              v-model="secondaryTodos"
              v-bind="{ touchStartThreshold: 50, delay: 500 }"
              @start="drag = true"
              @end="drag = false"
            >
              <v-list-tile
                @click="() => {}"
                v-for="(t, index) in secondaryTodos"
                :key="index"
              >
                <v-list-tile-action>
                  <v-checkbox
                    v-model="t.done"
                    @click.stop.prevent="setDone(t)"
                    :color="accentColor"
                  ></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content
                  @click="handleEdit(t)"
                  :class="t.done ? 'grey--text' : 'text--primary'"
                >
                  <v-list-tile-title>{{ t.task }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{
                    t.description
                  }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-scroll-x-transition>
                  <v-icon v-if="t.done" color="green">check</v-icon>
                </v-scroll-x-transition>
              </v-list-tile>
            </draggable>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
    <v-btn
      color="blue-grey white--text"
      dark
      fab
      bottom
      right
      fixed
      @click="handleAdd"
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
                    label="What needs to be done"
                    required
                    v-model="selectedTodo.task"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="More details"
                    rows="1"
                    auto-grow
                    v-model="selectedTodo.description"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="handleClose">Close</v-btn>
            <v-btn color="blue-grey white--text" @click.native="handleSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable';
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
  components: {
    draggable
  },
  data() {
    return {
      listId: undefined,
      selectedTodo: { ...initialTodo },
      selectedRef: { ...initialTodo },
      showDialog: false,
      mode: undefined,
      drag: false
    };
  },
  methods: {
    updateTodos(todos) {
      todosRef.doc(this.$route.params.id).update({ todos });
    },
    setDone(todo) {
      todo.done = !todo.done;
      this.updateTodos(this.list.todos);
    },
    handleAdd() {
      this.showDialog = true;
      this.mode = MODE_CREATE;
    },
    handleEdit(todo) {
      this.selectedTodo = { ...todo };
      this.selectedRef = todo;
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
        this.selectedRef.task = this.selectedTodo.task;
        this.selectedRef.description = this.selectedTodo.description;
        this.updateTodos(this.list.todos);
      } else {
        this.list.todos.push({
          id: this.getNextTodoId(),
          done: false,
          task: this.selectedTodo.task,
          description: this.selectedTodo.description
        });
        this.updateTodos(this.list.todos);
      }
      this.selectedTodo = { ...initialTodo };
      this.selectedRef = { ...initialTodo };
      this.mode = undefined;
    },
    getNextTodoId() {
      let max = this.list.todos.reduce((t1, t2) => {
        return Math.max(t1.id, t2.id);
      }, 1);
      if (!max) {
        return 1;
      }
      return max + 1;
    }
  },
  computed: {
    list() {
      if (this.listId) {
        return (
          this.todos.find(t => t.id === this.listId) || {
            todos: []
          }
        );
      }
    },
    mainTodos: {
      get() {
        if (!this.list || !this.list.todos) {
          return [];
        }
        if (this.focusOpen) {
          return this.list.todos.filter(t => !t.done);
        } else {
          return this.list.todos;
        }
      },
      set(todos) {
        if (this.focusOpen) {
          this.updateTodos(todos.concat(this.secondaryTodos));
        } else {
          this.updateTodos(todos);
        }
      }
    },
    secondaryTodos: {
      get() {
        if (!this.list || !this.list.todos) {
          return [];
        }
        if (this.focusOpen) {
          return this.list.todos.filter(t => !!t.done);
        } else {
          return [];
        }
      },
      set(todos) {
        if (this.focusOpen) {
          this.updateTodos(this.mainTodos.concat(todos));
        } else {
          this.updateTodos(todos);
        }
      }
    },
    focusOpen: {
      get() {
        return this.loggedIn ? this.settings.focusOpen : this.appFocusOpen;
      },
      set(value) {
        this.$store.commit('app/setFocusOpen', value);
        if (this.loggedIn) {
          const settings = this.settings;
          settings.focusOpen = value;
          this.$store.dispatch('user/setSettings', settings);
        }
      }
    },
    completedTodos() {
      if (!this.list || !this.list.todos) {
        return 0;
      }
      return this.list.todos.filter(t => t.done).length;
    },
    progress() {
      return (this.completedTodos / this.list.todos.length) * 100;
    },
    accentColor() {
      if (!this.list || !this.list.color || !this.list.color.color) {
        return 'blue-grey';
      }
      const listColor = this.list.color.color;
      if (listColor === 'white' || listColor === 'black') {
        return 'blue-grey';
      } else {
        return listColor;
      }
    },
    ...mapGetters({
      user: 'user/user',
      loggedIn: 'user/loggedIn',
      settings: 'user/settings',
      appFocusOpen: 'app/focusOpen',
      todos: 'todo/lists'
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        if (newRoute.name === 'list') {
          this.listId = newRoute.params.id;
        }
      }
    },
    progress: {
      immediate: true,
      handler: function(newValue, oldValue) {
        if (newValue !== 100 && oldValue !== 100) {
          return;
        }
        const completed = newValue === 100;
        todosRef.doc(this.$route.params.id).update({
          completed
        });
      }
    }
  }
};
</script>

<style scoped>
.strike {
  text-decoration: line-through;
}
</style>
