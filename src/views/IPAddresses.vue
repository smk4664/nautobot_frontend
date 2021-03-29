<template>
  <DataTable
    api_endpoint='/api/ipam/ip-addresses'
    model='ipam:ip-addresses'
  />
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'IPAddresses',
  components: {
    DataTable
  }
}
</script>
