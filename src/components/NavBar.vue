<template>
  <v-app-bar
    app
    color="nav"
    clipped-left
  >
    <div class="d-flex align-center">
      <router-link to="/">
        <img src="@/assets/nautobot_logo.png"/>
      </router-link>
    </div>

    <v-spacer></v-spacer>


    <v-btn
      v-if="!isLoggedIn"
      to="/login"
      text
      class="nav_text--text"
    >
      <v-icon>mdi-login</v-icon>
      <span class="mr-2">Log in</span>
    </v-btn>
    <v-btn
      v-if="isLoggedIn"
      @click="logout"
      text
      class="nav_text--text"
    >
      <v-icon>mdi-logout</v-icon>
      <span class="mr-2">Log out</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
}
</script>
