export default {
  fetchUser({
    commit
  }, user) {
    commit("SET_LOGGED_IN", user !== null);

    if (user) {

      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email
      })
      commit("GET_USER_INFO", user.email);
    } else {
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false)
      commit("GET_USER_INFO", false)
    }
  },

  getAllBooks({
    commit
  }) {
    commit('GET_ALL_BOOKS')
  },
  deleteBookById({ commit }, BookId) {
    commit('DELETE_BOOK_BY_ID', BookId)
  },
  reserveBook({
    commit
  }, bookId) {
    commit('RESERVE_BOOK', bookId)
  },
  giveBook({ commit }, pr) {
    commit('GIVE_BOOK', pr)
  },
  returnBook({ commit }, temp) {
    commit('RETURN_BOOK', temp)
  },
  updateBook({ commit }, newBook) {
    commit('UPDATE_BOOK', newBook)
  },
  getAllBookflow({
    commit
  }, bookflow) {
    commit('GET_ALL_BOOKFLOW', bookflow)
  },
  getBackend({
    commit
  }, serverType) {
    commit('SET_BACKEND', serverType)
  },
  createBook({
    commit
  }, book) {
    commit('CREATE_BOOK', book)
  },
  clearBooksDB({
    commit
  }) {
    commit('CLEAR_BOOKS_DB')
  },
  clearUsersDB({
    commit
  }) {
    commit('CLEAR_USERS_DB')
  },
  // On Registration
  createUser({
    commit
  }, user) {
    commit('CREATE_USER', user)
  },
  // From Admin panel
  updateUser({
    commit
  }, user) {
    commit('UPDATE_USER', user)
  }
}