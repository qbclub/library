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
                console.error("There was an error!", error);
            });
    },
    CLEAR_BOOKS_DB() {
        axios
            .get("http://localhost:3000/api/books/clear")
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    CLEAR_USERS_DB() {
        axios
            .get("http://localhost:3000/api/users/clear")
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    RESERVE_BOOK(state, bookId) {
        let e = {
            Id: Date.now(),
            BookId: bookId,
            UserEmail: state.userInfo.Contacts.Email,
            BookStatus: 'Зарезервирована',
            TimeStamp: Date.now()
        }
        axios
            .post('http://localhost:3000/api/bookflow/create', e)
            .then((response) => {
                console.log("Responsed on reserve book with status: ", response.status)

                // ToDo: CurrentReservedBooks  надо сделать строкой а не массивом

                state.userInfo.CurrentReservedBooks.push(bookId)
                // .push(bookId)
            })
            .catch(err => console.error(err))

        state.userInfo.CurrentReservedBooks.push(bookId);

        axios
            .put('http://localhost:3000/api/users/update',
                {
                    setupOptions: {
                        $set: { 'CurrentReservedBooks': state.userInfo.CurrentReservedBooks }
                    },
                    email: state.userInfo.Contacts.Email
                })
            .then((response) => {
                console.log('Update user ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        axios
            .put("http://localhost:3000/api/books/update",
                {
                    id: bookId,
                    setupOptions: {
                        $set: { "Status": "Зарезервирована" }
                    }
                })
            .then((response) => {
                console.log('Update book ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
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

        console.log(pr.userEmail, pr.bookId, e)

        axios
            .post('http://localhost:3000/api/bookflow/create', e)
            .then((response) => {
                console.log("Responsed on GIVE book with status: ", response.status)

                // ToDo: CurrentReservedBooks  надо сделать строкой а не массивом

                // .push(bookId)
            })
            .catch(err => console.error(err))

        return;
        axios
            .put('http://localhost:3000/api/users/update',
                {
                    setupOptions: {
                        $set: { 'CurrentTakenBooks': state.userInfo.CurrentTakenBooks }
                    },
                    email: pr.userEmail
                })
            .then((response) => {
                console.log('Update user ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        // ReservedQueue // очередь FIFO Id-шников, кто из пользователей зарезервировал книгу - пока не знаю, надо или нет
        // TemporaryOwner //кому книга выдана
        // DateOfGivenOut // когда книга выдана
        axios
            .put("http://localhost:3000/api/books/update",
                {
                    id: pr.bookId,
                    setupOptions: {
                        $set: { "Status": "Выдана", "TemporaryOwner": pr.userEmail, "DateOfGivenOut": dt }
                    }
                })
            .then((response) => {
                console.log('Update book ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    // temp содержит пользователя(емейл) и id книги
    RETURN_BOOK(state, temp) {
        console.log(temp)
        return;
        const dt = Date.now()
        let e = {
            Id: dt,
            BookId: temp.bookId,
            UserEmail: temp.userEmail,
            BookStatus: 'На месте',
            TimeStamp: dt
        }

        axios
            .post('http://localhost:3000/api/bookflow/create', e)
            .then((response) => {
                console.log("Responsed on RETURN book with status: ", response.status)
            })
            .catch(err => console.error(err))

        axios
            .put('http://localhost:3000/api/users/update',
                {
                    setupOptions: {
                        $set: { 'CurrentTakenBooks': [] }
                    },
                    email: pr.userEmail
                })
            .then((response) => {
                console.log('Update user ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        // ReservedQueue // очередь FIFO Id-шников, кто из пользователей зарезервировал книгу - пока не знаю, надо или нет
        // TemporaryOwner //кому книга выдана
        // DateOfGivenOut // когда книга выдана
        axios
            .put("http://localhost:3000/api/books/update",
                {
                    id: pr.bookId,
                    setupOptions: {
                        $set: { "Status": "На месте", "TemporaryOwner": null, "DateOfGivenOut": null }
                    }
                })
            .then((response) => {
                console.log('Update book ', response)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    UPDATE_BOOK(state, newBook) {
        console.log(newBook);
        return;
        axios
            .put("http://localhost:3000/api/books/update", {
                setupOptions: { $set: { ...newBook } },
                id: newBook.Id
            })
            .then((response) => {
                console.log("Succesfully update book ", response)
            })
            .catch(err => console.error("Update book with error: ", err))
    },
    CREATE_USER(state, user) {
        console.log("create user: ", user)
        axios
            .post("http://localhost:3000/api/users/create", user)
            .then((response) => console.log("user created\nresponse: ", response))
            .catch((error) => {
                console.error("There was an error!", error);
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
                CurrentTakenBooks: _.CurrenttakenBooks,
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
            .then((response) => console.log("user updated\nresponse: ", response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }
}