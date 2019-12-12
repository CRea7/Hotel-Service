import axios from 'axios'

export default() => {1
    return axios.create({
        baseURL: 'https://hotel-api-staging.herokuapp.com/'
    })
}