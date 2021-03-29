<template>
  <v-list>
    <v-list-group
    v-for="item in nav_links"
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
      nav_links: [
        {
          title: 'Organization',
          icon: "mdi-office-building",
          items: [
            {
              title: 'Sites',
              subtitle: 'Geographic locations',
              endpoint: "/api/dcim/sites/?limit=1",
              display: false,
              link: "/sites",
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
          icon: "mdi-router",
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
          icon: 'mdi-database',
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
              total: 0,
              link: "/ip-addresses"
            },
          ]
        },
        {
          title: 'Circuits',
          icon: 'mdi-cable-data',
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
/*       function waitForCount(endpoint, card, item) {
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
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else if (error.request) {
                  console.log(error.request);
              } else {
                  // Something happened in setting up the request and triggered an Error
                  console.log('Error', error.message);
              }
              console.log(error.config);
          });
      } */


/*       if (this.$store.getters.isLoggedIn) {
        for ( var card in this.cards) {
          for (var item in this.cards[card]['items']) {
            if (this.cards[card]['items'][item]['endpoint']) {
              var vm=this;
              waitForCount(this.cards[card]['items'][item]['endpoint'], card, item)
            }
          }
        }
      } */
    }
  }
</script>
