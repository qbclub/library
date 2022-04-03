import axios from 'axios';
export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;
        state.userInfo = '';
    },
    GET_USER_INFO(state, email) {
        if (email) {
            axios
                .post("http://localhost:3000/api/users/get-by-email", {
                    email: email
                })
                .then((response) => state.userInfo = response.data)
                .catch((error) => {
                    console.error("There was an error!", error);
                })
        } else {
            state.userInfo = {};
        }
    },
    GET_ALL_BOOKS(state) {
        axios
            .get("http://localhost:3000/api/books/get-all")
            .then((response) => {
                state.books = response.data
            })
            .catch((error) => {
                console.error("cannot get all books, error: ", error);

            });

    },
    DELETE_BOOK_BY_ID(state, BookId) {
        axios.post("http://localhost:3000/api/books/delete-by-id", {
                id: BookId
            })
            .then((response) => {
                let books = state.books;
                for (let i = 0; i < books.length; i++) {
                    if (books[i].Id == BookId) {
                        books.splice(i, 1)
                        state.books = books
                        break;
                    }
                }
                console.log(
                    `delete book with id ${BookId} with status: `,
                    response.status
                );
            })
            .catch((err) => {
                console.error(
                    `cannot delete book with id ${BookId} with error: `,
                    err
                );
            });
    },
    GET_ALL_BOOKFLOW(state, bookflow) {
        state.bookflow = bookflow;
    },
    SET_BACKEND(state, serverType) {
        state.backend = serverType
    },
    CREATE_BOOK(state, book) {
        axios
            .post("http://localhost:3000/api/books/create", book)
            .catch((error) => {
                console.error("Cannot create book, error: ", error);
            });
    },
    CLEAR_BOOKS_DB() {
        axios
            .get("http://localhost:3000/api/books/clear")
            .then((response) => console.log('clear books with status ', response.status))
            .catch((error) => {
                console.error("Cannot clear books, error: ", error);
            });
    },
    CLEAR_USERS_DB() {
        axios
            .get("http://localhost:3000/api/users/clear")
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("Cannot clear users, error: ", error);
            });
    },
    RESERVE_BOOK(state, bookId) {
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
                state.userInfo.CurrentReservedBooks = bookId;

                let books = state.books;
                for (let i = 0; i < books.length; i++) {
                    if (books[i].Id == bookId) {
                        books[i].Status = 'Зарезервирована'
                        books[i].ReservedQueue = state.userInfo.Contacts.Email;
                        books[i].DateOfReserved = dateofReserved
                        break;
                    }
                }
            }).catch((error) => {
                console.error("Cannot reserved, error: ", error);
            });

    },
    GIVE_BOOK(state, bookIdUserEmailAndDt) {
        let books = state.books;
        for (let i = 0; i < books.length; i++) {
            if (books[i].Id == bookIdUserEmailAndDt.bookId) {
                books[i].TemporaryOwner = bookIdUserEmailAndDt.userEmail;
                books[i].DateOfGivenOut = bookIdUserEmailAndDt.dt;
                books[i].Status = 'Выдана'
                books[i].ReservedQueue = ''
                books[i].DateOfReserved = ''
                break;
            }
        }
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
            .put("http://localhost:3000/api/books/update", {
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
        axios.post("http://localhost:3000/api/users/create", user)
    },
    UPDATE_USER(state, newUser) {
        console.log("update user: ", newUser)
        let _ = newUser;
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
            .put("http://localhost:3000/api/users/update", {
                setupOptions,
                email: newUser.Contacts.Email
            })
            .then((response) => console.log("update user with status: ", response.status))
            .catch((error) => {
                console.error("cannot update user, error: ", error);
            });

    }
}