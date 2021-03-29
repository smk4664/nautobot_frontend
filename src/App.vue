<template>
  <v-app>
    <NavBar/>
    <v-navigation-drawer
    app 
    clipped 
    flat 
    color="nav"
    expand-on-hover
    >
    <DrawerLinks/>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      app
      color="nav"
    >
      <span v-if="nautobotVersion" class="footer--text">v{{ nautobotVersion }}</span>
      <v-spacer></v-spacer>
      <span class="footer--text">{{ new Date().toLocaleString() }}</span>
      <v-spacer></v-spacer>
      <v-btn
        href=https://nautobot.readthedocs.io/
        target="_blank"
        text
        class="footer--text"
      >
        <v-icon>mdi-book-open-page-variant</v-icon>
        <span class="mr-2">Docs</span>
      </v-btn>
      <v-btn
        href=https://nautobot.readthedocs.io/api
        target="_blank"
        text
        class="footer--text"
      >
        <v-icon>mdi-cloud-braces</v-icon>
        <span class="mr-2">API</span>
      </v-btn>
      <v-btn
        href=https://nautobot.readthedocs.io/graphql
        target="_blank"
        text
        class="footer--text"
      >
        <v-icon>mdi-graphql</v-icon>
        <span class="mr-2">GraphQL</span>
      </v-btn>
      <v-btn
        href=https://github.com/nautobot/nautobot
        target="_blank"
        text
        class="footer--text"
      >
        <v-icon>mdi-xml</v-icon>
        <span class="mr-2">Code</span>
      </v-btn>
      <v-btn
        href=https://github.com/nautobot/nautobot/wiki
        target="_blank"
        text
        class="footer--text"
      >
        <v-icon>mdi-lifebuoy</v-icon>
        <span class="mr-2">Code</span>
      </v-btn>
      <v-btn icon @click="toggle_dark_mode" class="footer--text">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';
import NavBar from './components/NavBar';
import DrawerLinks from './components/DrawerLinks'

export default {
  name: 'App',
  methods: {
    toggle_dark_mode: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  created() {
    axios.get("/api/status")
      .then(resp => {
        this.nautobotVersion = resp.data['nautobot-version']
      })
  }, 
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
          this.$vuetify.theme.dark = true;
      } else {
          this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem(
          "dark_theme",
          this.$vuetify.theme.dark.toString()
      );
    }
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
  },
  
  components: {
    NavBar,
    DrawerLinks
  },
  data: () => ({
    nautobotVersion: null
  }),
};
</script>
