<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Username</label>
     <input required v-model="username" type="username" placeholder="Name"/>
     <label>Token</label>
     <input required v-model="password" type="password" placeholder="Token"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>
<script>
  export default {
    data(){
      return {
        username : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        let password = this.password
        let username = this.username
        this.$store.dispatch('login', {username, password})
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
</script>