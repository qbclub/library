import axios from 'axios';
export default {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;
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
    CREATE_BOOK(state, book){
        axios
        .post("http://localhost:3000/api/books/create", book)
        .then((response) => console.log("book created\nresponse status: ", response.status))
        .catch((error) => {
            console.error("There was an error!", error);
        });
    },
    CLEAR_BOOKS_DB(state){
         axios
         .get("http://localhost:3000/api/books/clear")
         .then((response) => console.log(response))
         .catch((error) => {
             console.error("There was an error!", error);
         });
    }
}