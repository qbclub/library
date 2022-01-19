import books from '../../db/books'
import booksflow from '../../db/booksflow'

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

  async getAllBooks(ctx) {
    ctx.commit('GET_ALL_BOOKS', books)
  },

  async getAllBooksflow(ctx) {
    ctx.commit('GET_ALL_BOOKSFLOW', books)
  },

}