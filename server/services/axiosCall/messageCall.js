require('dotenv').config()

const axios = require('axios')
const axiosRoute = axios.create({
    baseURL: process.env.AXIOS_LOCAL
})
//CAMBIAR baseURL dsp pro la AXIOS_URL
module.exports = {
    sendMessage(destination, body) {
        return axiosRoute.post("/message", { destination, body }, { timeout: 4000 })
    }
}

