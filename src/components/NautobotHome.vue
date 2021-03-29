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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'NautobotHome',

    data: () => ({
      cards: [
        {
          title: 'Organization',
          items: [
            {
              title: 'Sites',
              subtitle: 'Geographic locations',
              endpoint: "/api/dcim/sites/?limit=1",
              display: false,
              link: "/dcim/sites",
              total: 0
            },
            {
              title: 'Tenants',
              subtitle: 'Customers or departments',
              endpoint: "/api/tenancy/tenants/?limit=1",
              display: false,
              total: 0
            },
          ]
        },
        {
          title: 'DCIM',
          items: [
            {
              title: 'Racks',
              subtitle: 'Equipment racks, optionally organized by group',
              endpoint: "/api/dcim/racks/?limit=1",
              display: false,
              total: 0
            },
            {
              title: 'Devices',
              subtitle: 'Rack-mounted network equipment, servers, and other devices',
              endpoint: "/api/dcim/devices/?limit=1",
              display: false,
              total: 0
            },
          ]
        },
        {
          title: 'IPAM',
          items: [
            {
              title: 'VRFs',
              subtitle: 'Virtual routing and forwarding tables',
              endpoint: "/api/ipam/vrfs/?limit=1",
              display: false,
              total: 0
            },
            {
              title: 'IP Addresses',
              subtitle: 'Individual IPv4 and IPv6 addresses',
              endpoint: "/api/ipam/ip-addresses/?limit=1",
              display: false,
              link: "/ipam/ip-addresses",
              total: 0
            },
          ]
        },
        {
          title: 'Circuits',
          items: [
            {
              title: 'Providers',
              subtitle: 'Organizations which provide circuit connectivity',
              endpoint: '/api/circuits/providers/?limit=1',
              display: false,
              total: 0
            },
            {
              title: 'Circuits',
              subtitle: 'Communication links for Internet transit, peering, and other services',
              endpoint: '/api/circuits/circuits/?limit=1',
              display: false,
              total: 0
            },
          ]
        }
      ],
    }),
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    created() {
      function waitForCount(endpoint, card, item) {
        axios.get(endpoint)
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
            if (this.cards[card]['items'][item]['endpoint']) {
              var vm=this;
              waitForCount(this.cards[card]['items'][item]['endpoint'], card, item)
            }
          }
        }
      }
    }
  }
</script>
