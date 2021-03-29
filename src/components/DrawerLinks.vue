<template>
  <v-list>
    <v-list-group
    v-for="item in this.$store.state.nautobot_data"
    :key="item.title"
    v-model="item.active"
    :prepend-icon="item.icon"
    no-action
    >
    <template v-slot:activator>
        <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
    </template>

    <v-list-item
        v-for="child in item.items"
        :key="child.title"
        :to="child.link"
        link
    >
        <v-list-item-content>
        <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
  // import axios from 'axios'

  export default {
    name: 'NautobotHome',
    data: () => ({
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    }
  }
</script>
