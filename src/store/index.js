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
            display: false
          },
          {
            title: 'Tenants',
            subtitle: 'Customers or departments',
            endpoint: "/api/tenancy/tenants/",
            total: 0,
            display: false
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
            total: 0,
            display: false
          },
          {
            title: 'Devices',
            subtitle: 'Rack-mounted network equipment, servers, and other devices',
            endpoint: "/api/dcim/devices/",
            total: 0,
            display: false
          },
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
            total: 0,
            display: false
          },
          {
            title: 'IP Addresses',
            subtitle: 'Individual IPv4 and IPv6 addresses',
            endpoint: "/api/ipam/ip-addresses/",
            link: "/ipam/ip-addresses",
            total: 0,
            display: false
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
            total: 0,
            display: false
          },
          {
            title: 'Circuits',
            subtitle: 'Communication links for Internet transit, peering, and other services',
            endpoint: '/api/circuits/circuits/',
            total: 0,
            display: false
          },
        ]
      }
    ]
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
    }
  },
  modules: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
