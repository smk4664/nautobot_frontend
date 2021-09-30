<template>
  <DetailCard name="Site" :items="items"/>
</template>

<script>
import DetailCard from "@/components/DetailCard"
export default {
  name: 'SiteDetail',
  data () {
      return {
        slug: this.$route.params.slug,
        items: [
          {name: "Test", value: "Testing Link", link: "/"},
          {name: "Test2", value: "Testing No Link"}
        ]

      };
    },
  components: {
    DetailCard
  },
}
</script>
