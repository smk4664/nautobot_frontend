<template>
  <v-container fluid>
    <v-row>
      <v-col
      v-for="card in cards"
      :key="card.title"
      dense
      >
        <v-card
        color="nav"
        width="500"
        >
          <v-card-title>{{ card.title }}</v-card-title>
          <v-divider></v-divider>
          <v-list two-line>
            <template v-for="item in card.items">
              <v-list-item :key="item.title" :to=item.link link v-if=item.on_home>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'NautobotHome',
    data: () => ({
      cards: []
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    created() {
      this.cards = JSON.parse(JSON.stringify(this.$store.state.nautobot_data))
      function waitForCount(endpoint, card, item) {
        axios.get(endpoint + "?limit=1")
        .then((response) => {
              // Success
              console.log(response);
              vm.cards[card]['items'][item].total = response.data.count
              vm.cards[card]['items'][item].display = true
          })
          .catch((error) => {
              // Error
              if (error.response) {
                  /*
                  * The request was made and the server responded with a
                  * status code that falls out of the range of 2xx
                  */
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else if (error.request) {
                  /*
                  * The request was made but no response was received, `error.request`
                  * is an instance of XMLHttpRequest in the browser and an instance
                  * of http.ClientRequest in Node.js
                  */
                  console.log(error.request);
              } else {
                  // Something happened in setting up the request and triggered an Error
                  console.log('Error', error.message);
              }
              console.log(error.config);
          });
      }


      if (this.$store.getters.isLoggedIn) {
        for ( var card in this.cards) {
          for (var item in this.cards[card]['items']) {
            if (this.cards[card]['items'][item]['on_home']) {
              var vm=this;
              waitForCount(this.cards[card]['items'][item]['endpoint'], card, item)
            }
          }
        }
      }
    }
  }
</script>
