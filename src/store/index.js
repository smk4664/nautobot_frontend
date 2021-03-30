import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    nautobot_data: [
      {
        title: 'Organization',
        icon: "mdi-office-building",
        items: [
          {
            title: 'Sites',
            subtitle: 'Geographic locations',
            endpoint: "/api/dcim/sites/",
            link: "/dcim/sites",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Tenants',
            subtitle: 'Customers or departments',
            endpoint: "/api/tenancy/tenants/",
            link: "/tenancy/tenants",
            total: 0,
            display: false,
            on_home: true
          },
        ]
      },
      {
        title: 'DCIM',
        icon: "mdi-router",
        items: [
          {
            title: 'Racks',
            subtitle: 'Equipment racks, optionally organized by group',
            endpoint: "/api/dcim/racks/",
            link: "/dcim/racks",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Device Types',
            subtitle: "Physical hardware models by manufacturer",
            endpoint: "/api/dcim/device-types",
            link: "/dcim/device-types",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Devices',
            subtitle: 'Rack-mounted network equipment, servers, and other devices',
            endpoint: "/api/dcim/devices/",
            link: "/dcim/devices",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Cables',
            subtitle: 'Cable Connections',
            endpoint: "/api/dcim/cables/",
            link: "/dcim/cables",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Interfaces',
            subtitle: 'Interface Connections',
            endpoint: "/api/dcim/interfaces/",
            link: "/dcim/interfaces",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Console',
            subtitle: 'Console Connections',
            endpoint: "/api/dcim/console-connections/",
            link: "/dcim/console-connections",
            total: 0,
            display: false,
            on_home: true
          }
        ]
      },
      {
        title: 'IPAM',
        icon: 'mdi-database',
        items: [
          {
            title: 'VRFs',
            subtitle: 'Virtual routing and forwarding tables',
            endpoint: "/api/ipam/vrfs/",
            link: "/api/vrfs",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'IP Addresses',
            subtitle: 'Individual IPv4 and IPv6 addresses',
            endpoint: "/api/ipam/ip-addresses/",
            link: "/ipam/ip-addresses",
            total: 0,
            display: false,
            on_home: true
          },
        ]
      },
      {
        title: 'Circuits',
        icon: 'mdi-cable-data',
        items: [
          {
            title: 'Providers',
            subtitle: 'Organizations which provide circuit connectivity',
            endpoint: '/api/circuits/providers/',
            link: "/circuits/providers",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Circuits',
            subtitle: 'Communication links for Internet transit, peering, and other services',
            endpoint: '/api/circuits/circuits/',
            link: "/circuits/circuits",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: "Circuit Types",
            subtitle: "Types of circuits available",
            endpoint: "/api/circuits/circuit-types/",
            link: "/circuits/circuit-types",
            total: 0,
            display: false,
            on_home: false
          }
        ]
      },
      {
        title: 'Power',
        icon: 'mdi-power-socket',
        items: [
          {
            title: 'Power Feeds',
            subtitle: 'Electrical circuits delivering power from panels',
            endpoint: '/api/dcim/power-feeds/',
            link: "/dcim/power-feeds",
            total: 0,
            display: false,
            on_home: true
          },
          {
            title: 'Power Panels',
            subtitle: 'Electrical panels receiving utility power',
            endpoint: '/api/dcim/power-panels/',
            link: "/dcim/power-panels",
            total: 0,
            display: false,
            on_home: true
          },
        ]
      }
    ],
    nautobot_statuses: null
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.token = token
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    setStatuses(state, data){
      state.nautobot_statuses = data
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        //axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
        /*.then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(resp)
        })*/
        let token = user.password
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Token '+token
        commit('auth_success', token)
        resolve()
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getStatuses({commit}){
      axios.get('/api/extras/statuses/')
      .then(res => {
        commit('setStatuses', res.data.results)
      })
    }
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    nautobotStatuses: state => state.nautobot_statuses,
  }
})
