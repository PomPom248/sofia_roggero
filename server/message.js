const express = require('express');
const messageRouter = express.Router()
const messageFunction = require('./messageFunction')

messageRouter.post('/messages', (req, res, next) => {
    const { destination, body } = req.body
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