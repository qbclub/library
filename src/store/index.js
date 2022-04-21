import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions/actions'
import mutations from './mutations/mutations'
import getters from './getters/getters'





Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    userInfo: {},
    backend: 'node',
    books: [],
    bookflow: [],
    // apiUrl:"http://localhost:3000/",
    apiUrl:"http://grif-qbit.duckdns.org:8080/"
  },
  mutations,
  actions,
  getters
})

export default store;