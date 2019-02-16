<template>
  <span>
    <v-menu
      bottom
      :max-width="400"
      lazy
      offset-y
      transition="slide-y-transition"
      z-index="500"
    >
      <v-avatar :color="value.color" slot="activator">
        <span
          :class="{
            'white--text': value.whiteText,
            'grey--text text--darken-3': !value.whiteText
          }"
          class="text-capitalize"
          >{{ value.color }}</span
        >
      </v-avatar>

      <v-layout row wrap ml-2 mt-2>
        <v-flex v-for="c in colorSet" :key="c.color" xs2 mb-1>
          <v-avatar
            :color="c.color"
            @click="$emit('input', c)"
            :style="{ cursor: 'pointer' }"
          >
            <span
              :class="{
                'white--text': c.whiteText,
                'grey--text text--darken-3': !c.whiteText
              }"
              class="text-capitalize"
              >{{ c.color }}</span
            >
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-menu>
  </span>
</template>

<script>
const colorSet = [
  {
    color: 'red',
    whiteText: true
  },
  {
    color: 'pink',
    whiteText: true
  },
  {
    color: 'purple',
    whiteText: true
  },
  {
    color: 'deep-purple',
    whiteText: true
  },
  {
    color: 'indigo',
    whiteText: true
  },
  {
    color: 'blue',
    whiteText: true
  },
  {
    color: 'light-blue',
    whiteText: true
  },
  {
    color: 'cyan',
    whiteText: true
  },
  {
    color: 'teal',
    whiteText: true
  },
  {
    color: 'green',
    whiteText: true
  },
  {
    color: 'light-green',
    whiteText: true
  },
  {
    color: 'lime',
    whiteText: true
  },
  {
    color: 'yellow',
    whiteText: false
  },
  {
    color: 'amber',
    whiteText: true
  },
  {
    color: 'orange',
    whiteText: true
  },
  {
    color: 'brown',
    whiteText: true
  },
  {
    color: 'blue-grey',
    whiteText: true
  },
  {
    color: 'grey',
    whiteText: true
  },
  {
    color: 'black',
    whiteText: true
  },
  {
    color: 'white',
    whiteText: false
  }
];

export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: Object,
      required: true,
      default: function() {
        return {
          color: 'white',
          whiteText: false
        };
      }
    }
  },
  data() {
    return {
      colorSet: colorSet
    };
  }
};
</script>
