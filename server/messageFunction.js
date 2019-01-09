const axios = require('axios')

const axiosRoute = axios.create({
    baseURL: "http://sofia_roggero_messageapp_1:3000"
})

module.exports = {
    sendMessage(destination, body) {
        return axiosRoute.post("/message", { destination, body })
    }
}

