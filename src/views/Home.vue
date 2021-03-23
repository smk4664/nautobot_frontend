<template>
  <div class="home">
    <NautobotHome msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NautobotHome from '@/components/NautobotHome.vue'

export default {
  name: 'Home',
  components: {
    NautobotHome
  }
}
</script>
