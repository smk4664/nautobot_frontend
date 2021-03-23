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
              <v-list-item :key="item.title">
                <v-list-item-content class="text-left">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-badge icon="mdi-lock" inline></v-badge>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'NautobotHome',

    data: () => ({
      cards: [
        {
          title: 'Organization',
          items: [
            {
              title: 'Sites',
              subtitle: 'Geographic locations'
            },
            {
              title: 'Tenants',
              subtitle: 'Customers or departments'
            },
          ]
        },
        {
          title: 'DCIM',
          items: [
            {
              title: 'Racks',
              subtitle: 'Equipment racks, optionally organized by group'
            },
            {
              title: 'Devices',
              subtitle: 'Rack-mounted network equipment, servers, and other devices'
            },
          ]
        },
        {
          title: 'IPAM',
          items: [
            {
              title: 'VRFs',
              subtitle: 'Virtual routing and forwarding tables'
            },
          ]
        },
        {
          title: 'Circuits',
          items: [
            {
              title: 'Providers',
              subtitle: 'Organizations which provide circuit connectivity'
            },
            {
              title: 'Circuits',
              subtitle: 'Communication links for Internet transit, peering, and other services'
            },
          ]
        }
      ],
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
