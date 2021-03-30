<template>
  <v-card
  color="nav"
  width="500"
  >
    <v-card-title>{{ card.title }}</v-card-title>
    <v-divider></v-divider>
    <v-list two-line>
    <template v-for="item in card.items">
        <v-list-item :key="item.title" :to=item.link link>
        <v-list-item-content class="text-left">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-badge 
        v-if="item.display"
        :content="item.total.toString()"
        inline
        >
        </v-badge>
        <v-badge v-else icon="mdi-lock" inline></v-badge>
        </v-list-item>
    </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      statuses=null
    }
  },
  async created(){
    if(this.$store.state.nautobot_statuses === null){
      await this.$store.dispatch('getStatuses')
    }
    this.statuses = this.$store.getters.nautobotStatuses
  }
}
</script>