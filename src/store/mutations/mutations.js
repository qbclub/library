import axios from 'axios';
export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        console.log(data);
        state.user.data = data;
        state.userInfo = '';

    },
    GET_USER_INFO(state, email) {
        if (email) {
            axios
                .post("http://localhost:3000/api/users/get-by-email", { email: email })
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
                console.error("There was an error!", error);
            });
    },
    DELETE_BOOK_BY_ID(state, BookId) {
        axios
            .post("http://localhost:3000/api/books/delete-by-id", { id: BookId })
            .then((response) => console.log(`delete book with id ${BookId} with status`, response.status))
            .catch((err) => console.error(`cannot delete book with id ${BookId} with error `, err))
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
            .then((response) => console.log("book created\nresponse status: ", response.status))
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
        state.userInfo.CurrentReservedBooks = bookId;

        let e = {
            Id: Date.now(),
            BookId: bookId,
            UserEmail: state.userInfo.Contacts.Email,
            BookStatus: 'Зарезервирована',
            TimeStamp: Date.now()
        }
        axios
            .put('http://localhost:3000/api/books/change-state', { e, eventType: 'reserve' })
            .then((response) => console.log('reserve book with status', response.status))
            .catch((err) => console.error('cannot reserve book, error: ', err))
    },
    GIVE_BOOK(state, pr) {
        let dt = Date.now();
        let e = {
            Id: dt,
            BookId: pr.bookId,
            UserEmail: pr.userEmail,
            BookStatus: 'Выдана',
            TimeStamp: dt
        }

        axios
            .put('http://localhost:3000/api/books/change-state', { e, eventType: 'give' })
            .then((response) => console.log('give book with status: ', response.status))
            .catch((err) => console.error('cannot give book, error: ', err))

    },
    // temp содержит пользователя(емейл) и id книги
    RETURN_BOOK(state, temp) {
        const dt = Date.now()
        let e = {
            Id: dt,
            BookId: temp.bookId,
            UserEmail: temp.userEmail,
            BookStatus: 'На месте',
            TimeStamp: dt
        }

        axios
            .put('http://localhost:3000/api/books/change-state', { e, eventType: 'return' })
            .then((response) => console.log('return book with status: ', response.status))
            .catch((err) => console.error('cannot return book, error: ', err))
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
        console.log("create user: ", user)
        axios
            .post("http://localhost:3000/api/users/create", user)
            .then((response) => console.log("create user with status: ", response.status))
            .catch((error) => {
                console.error("cannot create user, error: ", error);
            });

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
            .put("http://localhost:3000/api/users/update",
                {
                    setupOptions,
                    email: newUser.Contacts.Email
                })
            .then((response) => console.log("update user with status: ", response.status))
            .catch((error) => {
                console.error("cannot update user, error: ", error);
            });

    }
}