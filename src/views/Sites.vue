<template>
  <DataTable
    api_endpoint='/api/dcim/sites'
    model='dcim:sites'
  />
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'Sites',
  components: {
    DataTable
  }
}
</script>
