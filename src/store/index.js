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
    backend: 'node',
    books: [],
    bookflow: [],
  },
  mutations,
  actions,
  getters
})

export default store;