

export default {
  fetchUser({
    commit
  }, user) {
    commit("SET_LOGGED_IN", user !== null);

    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email
      });
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
  createUser({ commit }, user) {
    commit('CREATE_USER', user)
  }


}

