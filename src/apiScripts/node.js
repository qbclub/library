import axios from 'axios';

const server = 'http://localhost:8080/api';

const jsMethods = {
    // USERS
    createUser: async function (user) {
        console.log(user)
        await axios.post(server + '/users/create', user)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    getAllUsers: async function () {
        await axios.get(server + '/users')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    getUserById: async function (id) {
        await axios.get(server + `/users/${id}`)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    deleteUser: async function (id) {
        await axios.delete(server + `/users/${id}`, id)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    deleteAllUsers: async function () {
        await axios.delete(server + '/users/clear')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    /**
         * Странный запрос, пока закомментируем
         * Вообще put запросы сделаем позже
         */
    // updateUser: async function (id) {
    //     await axios.put(server + '/users/', id)
    //         .then(response => console.log(response))
    //         .catch(err => console.error(err))
    // },

    // BOOKS
    createBook: async function (book) {
        await axios.post(server + '/books', book)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    getAllBooks: async function () {
        await axios.get(server + '/books')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    getBookById: async function (id) {
        await axios.get(server + `/books/${id}`)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
    clearBooks: async function () {
        await axios.delete(server + '/books/clear')
            .then(response => console.log(response))
            .catch(err => console.error(err))
    },
}

export default jsMethods
