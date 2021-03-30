<template>
  <v-card
    app
  >
    <v-autocomplete
      :items="headers"
      v-model="headersSelected"
      return-object
      label="Select headers"
      multiple
      chips>
    </v-autocomplete>
    <v-btn @click="save" class="mt-3">Save</v-btn>
    <v-data-table
      :page="page"
      :headers="headersSelected"
      :pageCount="numberOfPages"
      :items="results"
      :options.sync="options"
      :server-items-length="count"
      :loading="loading"
      app
      @click:row="handleClick"
    ></v-data-table>
  </v-card>
</template>
<script>
  import axios from "axios";
  export default {
    name: "DataTable",
    data () {
      return {
        page: 1,
        count: 0,
        numberOfPages: 0,
        results: [],
        loading: true,
        options: {},
        headers: [],
        headersSelected: [],
        api_endpoint: null,
        model: null
      };
    },
    //this one will populate new data set when user changes current page. 
    watch: {
      options: {
        handler() {
          this.readDataFromAPI();
        },
      },
      deep: true,
    },
    methods: {
      //Reading data from API method. 
      readDataFromAPI() {
        this.loading = true;
        const { page, itemsPerPage } = this.options;
        let pageNumber = page - 1;
        const ignoreFields = ['id', 'slug', 'url', 'status', "custom_fields"]
        console.log(pageNumber)
        console.log(itemsPerPage)
        axios
          .get(
            this.api_endpoint +
            '/?limit=' +
            itemsPerPage +
            '&offset=' +
            (pageNumber * itemsPerPage)
          )
          .then((response) => {
            //Then injecting the result to datatable parameters.
            this.headers = []
            this.loading = false;
            this.results = response.data.results;
            this.count = response.data.count;
            this.numberOfPages = Math.floor(response.data.count/itemsPerPage);
            for (var key in response.data.results[0]) {
              if (!ignoreFields.includes(key)) {
                console.log(key)
                this.headers.push({text: key, value: key});
              }
              if (key == 'status') {
                console.log(key)
                this.headers.push({text: key, value: "status_label"})
              }
              if (key == 'custom_fields'){
                for (var custom_field_key in response.data.results[0].custom_fields){
                  this.headers.push({text: custom_field_key, value: custom_field_key})
                }
              }
            }
            for (var item in response.data.results) {
              if (typeof response.data.results[item].status != 'undefined') {
                this.results[item]['status_label'] = response.data.results[item].status.label
              }
              for (var custom_field in response.data.results[item].custom_fields) {
                this.results[item][custom_field] = response.data.results[item].custom_fields[custom_field]
              }
            }
          });
      },
      populateHeaders(){
        let headers = JSON.parse(localStorage.getItem(this.model + ':headers'))
        if(!headers){
          this.headersSelected = this.headers
        }else{
          this.headersSelected = headers
        }
      },
      save(){
        localStorage.setItem(this.model + ':headers', JSON.stringify(this.headersSelected))
        alert('Table format saved')
      },
      handleClick(row) {
        // or just do something with your current clicked row item data
        console.log(row)
        if (typeof(row.slug) != 'undefined' && row.slug != null){
          console.log(row.slug)
          this.$router.push(this.$router.currentRoute.path + '/' + row.slug)
        } else {
          console.log(row.id)
          this.$router.push(this.$router.currentRoute.path + '/' + row.id)
        }
        
      },
    },
    //this will trigger in the onReady State
    mounted() {
      var temp = this.$route.path.substring(1)
      this.model = temp.replace("/", ":")
      this.api_endpoint = "/api" + this.$route.path
      this.readDataFromAPI();
      this.populateHeaders();
      console.log(this.$route.path)
    },
  };
</script>