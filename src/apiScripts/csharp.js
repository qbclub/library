import axios from 'axios'

const server = 'http://localhost:8080/api';

const methods = {
    createUser: async function (user) {
        console.log(user)
        await axios.post(server + '/users/create', user)
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }
}

export default methods
