

export default {
  fetchUser({
    commit
  }, userEmail) {

    if (userEmail) {
      commit("SET_LOGGED_IN", true);
      commit("SET_USER", userEmail);
    } else {
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false)
    }
  },

  getAllBooks({ commit }) {
    commit('GET_ALL_BOOKS')
  },

  getAllBookflow({ commit }, bookflow) {
    commit('GET_ALL_BOOKFLOW', bookflow)
  },
  getBackend({ commit }, serverType) {
    commit('SET_BACKEND', serverType)
  },
  createBook({ commit }, book) {
    commit('CREATE_BOOK', book)
  },
  clearBooksDB({ commit }) {
    commit('CLEAR_BOOKS_DB')
  },
  // On Registration
  createUser({ commit }, user) {
    commit('CREATE_USER', user)
  },
  // From Admin panel
  updateUser({ commit }, user) {
    commit('UPDATE_USER', user)
  }
}

