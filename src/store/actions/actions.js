

export default {
  fetchUser({
    commit
  }, userEmail) {
    commit("SET_LOGGED_IN", userEmail !== null);

    if (userEmail) {
      commit("SET_USER", {
        Email: userEmail,
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
  // On Registration
  createUser({ commit }, user) {
    commit('CREATE_USER', user)
  },
  // From Admin panel
  updateUser({ commit }, user) {
    commit('UPDATE_USER', user)
  }
}

