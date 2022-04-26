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
    getUserInfo({
        commit
    }, user) {
        commit("GET_USER_INFO", false)
    },


    getAllBooks({
        commit,
        state
    }) {
        axios
            .get(state.apiUrl + "api/books/get-all")
            .then((response) => {
                commit('GET_ALL_BOOKS', response.data)
            })
        // .catch((error) => {
        //     console.error("cannot get all books, error: ", error);
        //     return error;
        // });
    },
    deleteBookById({
        commit,
        state
    }, BookId) {
        commit('DELETE_BOOK_BY_ID', BookId)
        axios.post(state.apiUrl + "api/books/delete-by-id", {
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
            .put(state.apiUrl + 'api/books/change-state', {
                e,
                eventType: 'reserve'
            })
            .then(() => {
                axios
                    .get(state.apiUrl + "api/books/get-all")
                    .then((response) => {
                        commit('GET_ALL_BOOKS', response.data)

                        axios
                            .post(state.apiUrl + "api/users/get-by-email", {
                                email: e.UserEmail
                            })
                            .then((response) => {

                                commit('SET_USER_INFO', response.data)
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                    })


                // commit('RESERVE_BOOK', bookId, dt)
            })
            .catch((err) => console.error(err))
    },
    unreserveAllBooks() {
        axios.post(state.apiUrl + 'api/books/unreserve-all')
    },
    giveBook({
        commit,
        state
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
            .put(state.apiUrl + 'api/books/change-state', {
                e,
                eventType: 'give'
            })
            .then(() => {
                axios
                    .get(state.apiUrl + "api/books/get-all")
                    .then((response) => {
                        commit('GET_ALL_BOOKS', response.data)
                        // axios
                        //     .post("http://localhost:3000/api/users/get-by-email", { email: e.UserEmail })
                        //     .then((response) => {
                        //         commit('SET_USER_INFO', response.data)
                        //     })
                        //     .catch((error) => { console.error(error); })
                    }).then(() => {
                        axios
                            .post(state.apiUrl + "api/users/get-by-email", {
                                email: e.UserEmail
                            })
                            .then((response) => {

                                commit('SET_USER_INFO', response.data)
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                    })


                // commit('GIVE_BOOK', {
                //     bookId: bookIdAndUserEmail.bookId,
                //     userEmail: bookIdAndUserEmail.userEmail,
                //     dt: dt
                // })
            })
    },
    returnBook({
        commit,
        state
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
            .put(state.apiUrl + 'api/books/change-state', {
                e,
                eventType: 'return'
            })
            .then(() => {
                axios
                    .get(state.apiUrl + "api/books/get-all")
                    .then((response) => {
                        commit('GET_ALL_BOOKS', response.data)

                        // axios
                        //     .post("http://localhost:3000/api/users/get-by-email", { email: e.UserEmail })
                        //     .then((response) => {
                        //         commit('SET_USER_INFO', response.data)
                        //     })
                        //     .catch((error) => { console.error(error); })
                    })
                    .then(() => {
                        axios
                            .post(state.apiUrl + "api/users/get-by-email", {
                                email: e.UserEmail
                            })
                            .then((response) => {

                                commit('SET_USER_INFO', response.data)
                            })
                            .catch((error) => {
                                console.error(error);
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                    })

                // commit('RETURN_BOOK', bookIdAndUserEmail.bookId)
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
        let _ = user;
        let setupOptions = {
            $set: {
                FirstName: _.FirstName,
                LastName: _.LastName,
                BirthDate: _.BirthDate,
                EducationalInstitution: _.EducationalInstitution,
                LivingAddress: _.LivingAddress,
                isAdmin: _.isAdmin,
                CurrentTakenBooks: _.CurrentTakenBooks,
                CurrentReservedBooks: _.CurrentReservedBooks,
                Contacts: {
                    PhoneNumber: _.Contacts.PhoneNumber,
                    Email: _.Contacts.Email,
                    SocCeti: _.Contacts.SocCeti
                },
                PhotoPath: _.PhotoPath,
            }
        }
        axios
            .put(state.apiUrl + "api/users/update", {
                setupOptions,
                email: user.Contacts.Email
            })
            .then((response) => {
                commit('UPDATE_USER', user)
            })
            .catch((error) => {
                console.error("cannot update user, error: ", error);
            });
        // axios.post(state.apiUrl + "api/users/create", user).then(res => commit('UPDATE_USER', user)
        // )
    },

}