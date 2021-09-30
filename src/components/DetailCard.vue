<template>
  <v-card color="nav">
    <v-card-title class="subheading font-weight-bold">
      {{ name }}
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <template v-for="item in items"
      >
        <v-list-item :key="item.name" v-if="item.link" :to="item.link" link>
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-content class="align-end footer--text">
            {{ item.value }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item :key="item.name" v-if="!item.link">
          <v-list-item-content>{{ item.name }}</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ item.value }}
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'DetailCardIteratorSingle',
  props: {
    items: {
      type: Array
    },
    name: {
      type: String
    },
  }
}
</script>