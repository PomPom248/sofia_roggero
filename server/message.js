const express = require('express');
const messageRouter = express.Router()
const messageFunction = require('./messageFunction')

messageRouter.post('/messages', (req, res, next) => {
    const { destination, body } = req.body
    if (typeof destination !== 'string' || typeof body !== 'string') {
        // console.log('values must be strings')
        res.status(500).json("Values must be strings")
    } if (destination === '' || body === '') {
        console.log('Missing value')
        res.status(500).json("Missing value")
    } if (destination !== '' && !destination.includes('@')) {
        console.log('Destination needs to be an email')
        res.status(500).json("Destination needs to be an email")
    }
    // } if () {
    // }
    else {
        messageFunction.sendMessage(destination, body)
            .then(() => {
                res.status(200).json({ message: 'Message created' })
            })
            .catch(() => {
                res.status(500).json({ message: 'Error while creating the message' })
            })
    }

})
module.exports = messageRouter;