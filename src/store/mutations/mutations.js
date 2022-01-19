export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;
    },
    GET_ALL_BOOKS(state, books) {
        state.books = books;
    }
}