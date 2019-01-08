const express = require('express');
const messageRouter = express.Router()
const messageFunction = require('./messageFunction')

messageRouter.post('/messages', (req, res, next) => {
    const { destination, body } = req.body
    messageFunction.sendMessage(destination, body)
        .then(() => {
            res.status(200).json({ message: 'Message created' })
        })
        .catch(() => {
            res.status(500).json({ message: 'Error while creating the message' })
        })
})
module.exports = messageRouter;