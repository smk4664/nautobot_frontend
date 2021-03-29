<template>
  <v-banner>{{ slug }}</v-banner>
</template>

<script>

export default {
  name: 'SiteDetail',
  data () {
      return {
        slug: this.$route.params.slug
      };
    },
}
</script>
