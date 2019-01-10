const express = require('express');
const messageRouter = express.Router()
const messageFunction = require('./messageCall')
const createMessage = require('./createMessage')
const Message = require('./models/Message')

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
                let status = 'OK - 200'
                createMessage.create(destination, body, status, res)
                res.status(200).json({ message: 'Message created' })
            })
            .catch((err) => {
                // console.log(err)
                if (err.response === undefined) {
                    let status = 'TIMEOUT - 400'
                    createMessage.create(destination, body, status, res)
                    res.status(500).json({ message: 'Error due to timeout' })
                } else {
                    let status = 'NOT SENT - 500'
                    createMessage.create(destination, body, status, res)
                    res.status(500).json({ message: 'Connection lost' })
                }
            })
    }
})

messageRouter.get('/messages', (req, res, next) => {
    createMessage.find(res)
})

messageRouter.delete('/messages', (req, res, next) => {
    createMessage.delete(res)
})
module.exports = messageRouter;