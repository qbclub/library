import axios from 'axios';

const server = 'http://localhost:8080/api';

const jsMethods = {
    // send request to get all books
    getAllBooks: function () {
        axios
            .get("http://localhost:3000/api/books/get-all")
            .then((response) => console.log(response))
            .catch((error) => {
                // this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },
    getBookById: function (id) {
        axios
            .get(`http://localhost:3000/api/books?id=${id}`)
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    createBook: async function (book) {
        console.log(book);
        //запрос отправляется на адрес https://cubit-2021.appspot.com/api/insert
        await axios
            .post("http://localhost:3000/api/books/create", book)
            .then((response) => console.log(response))
            .catch((error) => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },
    clearBooks: function () {
        let con = confirm("Удалить все книги?");
        if (con) {
            axios
                .get("http://localhost:3000/api/books/clear")
                .then((response) => console.log(response))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    },
    getAllBookflow: function () {
        axios
            .get("http://localhost:3000/api/bookflow/get-all")
            .then((response) => console.log(response))
            .catch((error) => {
                // this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },
    createBookflow: async function (bookflow) {
        await axios
            .post("http://localhost:3000/api/bookflow/create", bookflow)
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    clearBookflow: function () {
        let con = confirm("Удалить весь bookflow?");
        if (con) {
            axios
                .get("http://localhost:3000/api/bookflow/clear")
                .then((response) => console.log(response))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    },
    getAllUsers: function () {
        axios
            .get("http://localhost:3000/api/users/get-all")
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    createUser: async function () {
        await axios
            .post("http://localhost:3000/api/users/create", this.user)
            .then((response) => console.log(response))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    },
    clearUsers: function () {
        let con = confirm("Удалить всех пользователей?");
        if (con) {
            axios
                .get("http://localhost:3000/api/users/clear")
                .then((response) => console.log(response))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        } else {
            console.log("Отмена удаления пользователя")
        }
    },
}

export default jsMethods
