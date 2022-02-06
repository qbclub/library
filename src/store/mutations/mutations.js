import axios from 'axios';
export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {

        state.user.data = data;
       
    },
    GET_USER_INFO(state,email){
        if(email){
         
            axios
            .post("http://localhost:3000/api/users/get-by-email", {email: email})
            .then((response) => state.userInfo = response.data)
            .catch((error) => {
                console.error("There was an error!", error);
            })
        } else{
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
            UserId: state.userInfo.UserId,
            BookStatus: 'Зарезервирована',
            TimeStamp: Date.now()
        }
        axios
            .post('http://localhost:3000/api/bookflow/create', e)
            .then((response) => {
                console.log("Responsed on reserve book with status: ", response.status)
                state.userInfo.CurrentReservedBooks.push(bookId)
                // .push(bookId)
            })
            .catch(err => console.error(err))

    },
    CREATE_USER(state, user) {

        axios
            .post("http://localhost:3000/api/users/create", user)
            .then((response) => console.log("user created\nresponse status: ", response.status))
            .catch((error) => {
                console.error("There was an error!", error);
            });

    },
    UPDATE_USER(state, newUser) {
        axios
            .put("http://localhost:3000/api/users/update", newUser)
            .then((response) => console.log("user updated\nresponse status: ", response.status))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }
}