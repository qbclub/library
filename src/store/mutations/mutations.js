import axios from 'axios';
export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;
        state.userInfo = '';
    },
    SET_USER_INFO(state, data) {
        state.userInfo = data
    },
    GET_USER_INFO(state, email) {
        if (email) {
            axios
                .post(state.apiUrl + "api/users/get-by-email", { email: email })
                .then((response) => {
                    state.userInfo = response.data
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                })
        } else {
            state.userInfo = {};
        }
    },
    GET_ALL_BOOKS(state, books) {
        state.books = books;
    },
    DELETE_BOOK_BY_ID(state, BookId) {
        let books = state.books;
        for (let i = 0; i < books.length; i++) {
            if (books[i].Id == BookId) {
                books.splice(i, 1)
                break;
            }
        }
    },
    GET_ALL_BOOKFLOW(state, bookflow) {
        state.bookflow = bookflow;
    },
    SET_BACKEND(state, serverType) {
        state.backend = serverType
    },
    CREATE_BOOK(state, book) {
        axios
            .post(state.apiUrl + "api/books/create", book)
            .catch((error) => {
                console.error("Cannot create book, error: ", error);
            });
    },
    CLEAR_BOOKS_DB() {
        axios
            .get(state.apiUrl + "api/books/clear")
            .then((response) => console.log('clear books with status ', response.status))
            .catch((error) => {
                console.error("Cannot clear books, error: ", error);
            });
    },
    CLEAR_USERS_DB() {
        axios
            .get(state.apiUrl + "api/users/clear")
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("Cannot clear users, error: ", error);
            });
    },
    RESERVE_BOOK(state, bookId, dateofReserved) {
        // get all changes into state



        // state.userInfo.CurrentReservedBooks = bookId;
        // let books = state.books;
        // for (let i = 0; i < books.length; i++) {
        //     if (books[i].Id == bookId) {
        //         books[i].Status = 'Зарезервирована'
        //         books[i].ReservedQueue = state.userInfo.Contacts.Email;
        //         books[i].DateOfReserved = dateofReserved
        //         break;
        //     }
        // }
    },
    GIVE_BOOK(state, bookIdUserEmailAndDt) {
        // let books = state.books;
        // for (let i = 0; i < books.length; i++) {
        //     if (books[i].Id == bookIdUserEmailAndDt.bookId) {
        //         books[i].TemporaryOwner = bookIdUserEmailAndDt.userEmail;
        //         books[i].DateOfGivenOut = bookIdUserEmailAndDt.dt;
        //         books[i].Status = 'Выдана'
        //         books[i].ReservedQueue = ''
        //         books[i].DateOfReserved = ''
        //         break;
        //     }
        // }
    },
    RETURN_BOOK(state, bookId) {
        let books = state.books;
        for (let i = 0; i < books.length; i++) {
            if (books[i].Id == bookId) {
                books[i].ReservedQueue = '';
                books[i].TemporaryOwner = '';
                books[i].DateOfGivenOut = '';
                books[i].DateOfReserved = '';
                books[i].Status = 'На месте';
                break;
            }
        }
    },
    UPDATE_BOOK(state, newBook) {
        let _ = newBook
        axios
            .put(state.apiUrl + "api/books/update", {
                setupOptions: {
                    $set: {
                        Id: _.Id,
                        Name: _.Name,
                        Annotation: _.Annotation,
                        CoverPath: _.CoverPath,
                        Authors: _.Authors,
                        Sections: _.Sections,
                        ReleaseDate: _.ReleaseDate,
                        PhysicalPlace: _.PhysicalPlace,
                        ISBN: _.ISBN,
                        PublisherName: _.PublisherName,
                        PageCount: _.PageCount,
                        Series: _.Series,
                        Status: _.Status,
                        TimeStamp: _.TimeStamp,
                    }
                },
                id: newBook.Id
            })
            .then((response) => {
                console.log("update book with status: ", response.status)
            })
            .catch(err => console.error("cannot update book, error: ", err))
    },
    CREATE_USER(state, user) {
        state.userInfo = user;
    },
    UPDATE_USER(state, newUser) {
        // it happens on admin side, so we dont need to change state
    }
}