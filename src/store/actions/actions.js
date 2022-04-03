import axios from 'axios';

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
    deleteBookById({
        commit
    }, BookId) {
        commit('DELETE_BOOK_BY_ID', BookId)
        axios.post("http://localhost:3000/api/books/delete-by-id", {
            id: BookId
        })
        // .then((response) => {
        //     console.log(
        //         `delete book with id ${BookId} with status: `,
        //         response.status
        //     );
        // })
        // .catch((err) => {
        //     console.error(
        //         `cannot delete book with id ${BookId} with error: `,
        //         err
        //     );
        // });
    },
    // updateBooksInStateAfterDeletingOne({ commit, dispatch }) {
    //     await dispatch('deleteBookById')
    // },
    reserveBook({
        commit,
        state
    }, bookId) {
        let dt = Date.now()
        let e = {
            Id: dt,
            BookId: bookId,
            UserEmail: state.userInfo.Contacts.Email,
            BookStatus: 'Зарезервирована',
            TimeStamp: dt
        }
        axios
            .put('http://localhost:3000/api/books/change-state', {
                e,
                eventType: 'reserve'
            })
            .then(() => {
                commit('RESERVE_BOOK', bookId, dt)
            })
    },
    unreserveAllBooks() {
        axios.post('http://localhost:3000/api/books/unreserve-all')
    },
    giveBook({
        commit
    }, bookIdAndUserEmail) {
        let dt = Date.now();
        let e = {
            Id: dt,
            BookId: bookIdAndUserEmail.bookId,
            UserEmail: bookIdAndUserEmail.userEmail,
            BookStatus: 'Выдана',
            TimeStamp: dt
        }
        axios
            .put('http://localhost:3000/api/books/change-state', {
                e,
                eventType: 'give'
            })
            .then(() => {
                commit('GIVE_BOOK', {
                    bookId: bookIdAndUserEmail.bookId,
                    userEmail: bookIdAndUserEmail.userEmail,
                    dt: dt
                })
            })
    },
    returnBook({
        commit
    }, bookIdAndUserEmail) {
        const dt = Date.now()
        let e = {
            Id: dt,
            BookId: bookIdAndUserEmail.bookId,
            UserEmail: bookIdAndUserEmail.userEmail,
            BookStatus: 'На месте',
            TimeStamp: dt
        }

        axios
            .put('http://localhost:3000/api/books/change-state', {
                e,
                eventType: 'return'
            })
            .then(() => {
                commit('RETURN_BOOK', bookIdAndUserEmail.bookId)
            })
    },
    updateBook({
        commit
    }, newBook) {
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