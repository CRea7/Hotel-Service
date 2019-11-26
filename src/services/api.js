import axios from 'axios'

export default() => {1
    return axios.create({
        baseURL: 'http://localhost:3000/'
    })
}