

export default {
  fetchUser({
    commit
  }, user) {


    if (userEmail) {
      commit("SET_LOGGED_IN", true);
      commit("SET_USER", userEmail);
    } else {
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false)
    }
  },
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
  reserveBook({ commit }, bookId) {
    commit('RESERVE_BOOK', bookId)
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

