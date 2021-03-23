<template>
  <v-app>
    <v-app-bar
      app
      color="nav"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Nautobot Logo"
          class="shrink mr-2"
          contain
          src="./assets/nautobot_logo.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
        class="nav_text--text"
      >
        <v-icon>mdi-login</v-icon>
        <span class="mr-2">Log in</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      app
      color="nav"
    >
      <span class="footer--text">version 1.0.0.b2</span>
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
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  methods: {
    toggle_dark_mode: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
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
/**
  components: {
    HelloWorld,
  },
  */
  data: () => ({
    //
  }),
};
</script>
