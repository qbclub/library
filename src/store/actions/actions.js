

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

  getAllBooks({ commit }, books) {
    commit('GET_ALL_BOOKS', books)
  },

  getAllBookflow({ commit }, bookflow) {
    commit('GET_ALL_BOOKFLOW', bookflow)
  },
  getBackend({ commit }, serverType) {
    commit('SET_BACKEND', serverType)
  },


}

