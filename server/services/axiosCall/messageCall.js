require('dotenv').config()

const axios = require('axios')
const axiosRoute = axios.create({
    baseURL: process.env.AXIOS_URL
})

module.exports = {
    sendMessage(destination, body) {
        return axiosRoute.post("/message", { destination, body }, { timeout: 3000 })
    }
}

