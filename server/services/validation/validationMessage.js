const messageFunction = require('../axiosCall/messageCall')
const createMessage = require('../messages/createMessage')

module.exports = {
    validation(destination, body, res, credit) {

        if (destination == '' || body == '') {

            res.status(400).json("Missing value")
        } else if (!body || !destination) {
            res.status(400).json("Missing key")
        }
        else if (typeof destination !== 'string' || typeof body !== 'string') {
            res.status(400).json("Values must be strings")
        }
        else if (!destination.includes('@')) {
            res.status(400).json("Destination needs to be an email")
        }
        else if (destination.length >= 100 || body.length >= 100) {
            res.status(400).json('Message is too long')
        }
        else if (credit <= 0) {
            res.status(400).json('No credit')
        }
        else {
            messageFunction.sendMessage(destination, body, res)
                .then(() => {
                    let statusCode = 'OK - 200'
                    createMessage.create(destination, body, statusCode, res)
                })
                .catch((err) => {
                    if (err.response === undefined) {
                        let statusCode = 'TIMEOUT - 400'
                        createMessage.create(destination, body, statusCode, res)
                    } else {
                        let statusCode = 'ERROR - 500'
                        createMessage.create(destination, body, statusCode, res)
                    }
                })
        }
    }
}